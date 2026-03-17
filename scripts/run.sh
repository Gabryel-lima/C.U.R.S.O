#!/usr/bin/env sh
set -eu

yellow=$(printf '\033[33m')
reset=$(printf '\033[0m')

trap 'printf "%s\n" "${yellow}Encerrado pelo usuário.${reset}"; exit 0' INT TERM

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
VENV_DIR="$PROJECT_ROOT/.venv"

if [ -x "$VENV_DIR/bin/python" ]; then
    PYTHON_BIN="$VENV_DIR/bin/python"
elif [ -x "$VENV_DIR/Scripts/python.exe" ]; then
    PYTHON_BIN="$VENV_DIR/Scripts/python.exe"
elif [ -x "$VENV_DIR/Scripts/python" ]; then
    PYTHON_BIN="$VENV_DIR/Scripts/python"
else
    printf '%s\n' "${yellow}Erro: .venv não encontrado. Execute make install primeiro.${reset}" >&2
    exit 1
fi

# Try to find a free port in the 8000-9000 range
ATTEMPTS=20
PORT=""
for i in $(seq 1 "$ATTEMPTS"); do
    CAND=$(shuf -i 8000-9000 -n 1)
    if command -v lsof >/dev/null 2>&1; then
        if ! lsof -iTCP:"$CAND" -sTCP:LISTEN -t >/dev/null 2>&1; then
            PORT=$CAND
            break
        fi
    elif command -v ss >/dev/null 2>&1; then
        if ! ss -ltn "( sport = :$CAND )" >/dev/null 2>&1; then
            PORT=$CAND
            break
        fi
    elif command -v netstat >/dev/null 2>&1; then
        if ! netstat -tuln | awk '{print $4}' | grep -E ":$CAND$" >/dev/null 2>&1; then
            PORT=$CAND
            break
        fi
    else
        # Fallback: use Python to attempt to bind the port
        if "$PYTHON_BIN" -c "
            import socket,sys; s=socket.socket();\
            try:\
                s.bind(('127.0.0.1', int(sys.argv[1]))); s.close()\
            except:\
                sys.exit(1)" "$CAND" 2>/dev/null; then
            PORT=$CAND
            break
        fi
    fi
done

if [ -z "$PORT" ]; then
    printf '%s\n' "${yellow}Erro: não foi possível encontrar uma porta livre entre 8000 e 9000.${reset}" >&2
    exit 1
fi

"$PYTHON_BIN" -m uvicorn curso_backend.main:app --reload --app-dir "$PROJECT_ROOT/src" --host 127.0.0.1 --port "$PORT"

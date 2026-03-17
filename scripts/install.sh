#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
VENV_DIR="$PROJECT_ROOT/.venv"

create_venv() {
    if [ -d "$VENV_DIR" ]; then
        printf '%s\n' ".venv já existe em $VENV_DIR"
        return 0
    fi

    if command -v python3 >/dev/null 2>&1; then
        python3 -m venv "$VENV_DIR"
        return 0
    fi

    if command -v python >/dev/null 2>&1; then
        python -m venv "$VENV_DIR"
        return 0
    fi

    if command -v py >/dev/null 2>&1; then
        py -3 -m venv "$VENV_DIR"
        return 0
    fi

    printf '%s\n' 'Erro: Python 3 não encontrado. Instale Python 3.12+ antes de continuar.' >&2
    exit 1
}

venv_python() {
    if [ -x "$VENV_DIR/bin/python" ]; then
        printf '%s\n' "$VENV_DIR/bin/python"
        return 0
    fi

    if [ -x "$VENV_DIR/Scripts/python.exe" ]; then
        printf '%s\n' "$VENV_DIR/Scripts/python.exe"
        return 0
    fi

    if [ -x "$VENV_DIR/Scripts/python" ]; then
        printf '%s\n' "$VENV_DIR/Scripts/python"
        return 0
    fi

    printf '%s\n' 'Erro: não foi possível localizar o Python dentro do .venv.' >&2
    exit 1
}

create_venv

if [ "${1-}" = "--venv-only" ]; then
    printf '%s\n' 'Ambiente virtual criado com sucesso.'
    exit 0
fi

PYTHON_BIN=$(venv_python)

"$PYTHON_BIN" -m pip install --upgrade pip setuptools wheel
"$PYTHON_BIN" -m pip install -e ".[dev]"

printf '%s\n' 'Instalação concluída.'
printf '%s\n' 'Linux/macOS: source .venv/bin/activate'
printf '%s\n' 'Windows PowerShell: .venv\\Scripts\\Activate.ps1'
printf '%s\n' 'Windows CMD: .venv\\Scripts\\activate.bat'

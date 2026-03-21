#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
VENV_DIR="$PROJECT_ROOT/.venv"

if [ -x "$VENV_DIR/bin/python" ]; then
    PYTHON_BIN="$VENV_DIR/bin/python"
elif [ -x "$VENV_DIR/Scripts/python.exe" ]; then
    PYTHON_BIN="$VENV_DIR/Scripts/python.exe"
elif [ -x "$VENV_DIR/Scripts/python" ]; then
    PYTHON_BIN="$VENV_DIR/Scripts/python"
else
    printf '%s\n' 'Erro: .venv não encontrado. Execute make install primeiro.' >&2
    exit 1
fi

cd "$PROJECT_ROOT" && "$PYTHON_BIN" -m pytest -q --maxfail=1 --disable-warnings --cov=curso_backend --cov-report=xml && "$PYTHON_BIN" -m ruff check .

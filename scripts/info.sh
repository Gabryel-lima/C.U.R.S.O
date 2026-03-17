#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
SYSTEM_NAME=$(uname -s 2>/dev/null || printf '%s' 'Windows')

printf 'Projeto: %s\n' 'C.U.R.S.O'
printf 'Raiz: %s\n' "$PROJECT_ROOT"
printf 'Sistema: %s\n' "$SYSTEM_NAME"

if [ -x "$PROJECT_ROOT/.venv/bin/python" ]; then
    printf 'Python do .venv: %s\n' "$PROJECT_ROOT/.venv/bin/python"
elif [ -x "$PROJECT_ROOT/.venv/Scripts/python.exe" ]; then
    printf 'Python do .venv: %s\n' "$PROJECT_ROOT/.venv/Scripts/python.exe"
elif [ -x "$PROJECT_ROOT/.venv/Scripts/python" ]; then
    printf 'Python do .venv: %s\n' "$PROJECT_ROOT/.venv/Scripts/python"
else
    printf '%s\n' 'Python do .venv: não encontrado'
fi

#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

find "$PROJECT_ROOT" -type d \( -name __pycache__ -o -name .pytest_cache -o -name .ruff_cache -o -name .mypy_cache \) -prune -exec rm -rf {} +
find "$PROJECT_ROOT" -type f \( -name '*.pyc' -o -name '*.pyo' \) -delete

if [ "${1-}" = "--venv" ] && [ -d "$PROJECT_ROOT/.venv" ]; then
    rm -rf "$PROJECT_ROOT/.venv"
fi

printf '%s\n' 'Limpeza concluída.'

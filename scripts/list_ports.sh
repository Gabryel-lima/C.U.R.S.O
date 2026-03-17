#!/usr/bin/env sh
set -eu

if command -v lsof >/dev/null 2>&1; then
    sudo lsof -i -P -n | grep LISTEN
elif command -v netstat >/dev/null 2>&1; then
    sudo netstat -tuln
else
    printf '%s\n' 'Erro: nenhum comando disponível para listar portas.' >&2
    exit 1
fi

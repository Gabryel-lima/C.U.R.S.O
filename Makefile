.DEFAULT_GOAL := help

.PHONY: help install venv run test list_ports lint check clean clean-venv info

help: ## Exibe a ajuda com os comandos disponíveis
	@awk 'BEGIN {FS = ":.*##"; printf "\nUso: make <alvo>\n\nAlvos disponíveis:\n"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Cria o .venv e instala dependências do projeto e de desenvolvimento
	@sh scripts/install.sh

venv: ## Cria apenas o ambiente virtual .venv
	@sh scripts/install.sh --venv-only

run: ## Inicia a API FastAPI em modo de desenvolvimento
	@sh scripts/run.sh

test: ## Executa a suíte de testes
	@sh scripts/test.sh

list_ports: ## Lista as portas em uso no sistema
	@sh scripts/list_ports.sh

lint: ## Executa verificações básicas de qualidade
	@sh scripts/lint.sh

check: lint test ## Executa lint e testes em sequência

clean: ## Remove caches e arquivos temporários
	@sh scripts/clean.sh

clean-venv: ## Remove o ambiente virtual .venv
	@sh scripts/clean.sh --venv

info: ## Exibe informações do ambiente atual
	@sh scripts/info.sh

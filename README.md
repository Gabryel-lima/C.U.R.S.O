# C.U.R.S.O

> **Centro de União, Resgate e Santuário dos Ursos**

![Status](https://img.shields.io/badge/status-base%20inicial-blue)
![Curso](https://img.shields.io/badge/Senai-Desenvolvimento%20Backend-red)
![Stack](https://img.shields.io/badge/Python-FastAPI%20%2B%20MySQL-3776AB)

Projeto acadêmico desenvolvido para o curso de Desenvolvimento Backend do Senai, com foco na modelagem, persistência de dados e construção de uma API REST para o gerenciamento de ursos resgatados e santuários.

---

## Sumário

- [Visão geral](#visão-geral)
- [Equipe](#equipe)
- [Divisão por fases](#divisão-por-fases)
- [Por que usar Make](#por-que-usar-make)
- [Como instalar o Make](#como-instalar-o-make)
- [Primeiros comandos](#primeiros-comandos)
- [Mapa da documentação](#mapa-da-documentação)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Automação disponível](#automação-disponível)
- [Direção técnica](#direção-técnica)
- [Próximos passos](#próximos-passos)

---

## Visão geral

O sistema C.U.R.S.O foi definido como uma plataforma para registrar ursos resgatados, controlar o encaminhamento para santuário, organizar cuidadores e manter o histórico operacional dos resgates.

### Entregas desta base

| Área | Conteúdo |
|------|----------|
| Escopo | Definição do problema, objetivo e CRUDs principais |
| UML | Casos de uso e diagrama de classes em Markdown |
| Banco de dados | Estrutura inicial em MySQL |
| API | Contrato inicial REST com rotas e respostas |
| Backend | Esqueleto mínimo em Python para evolução futura |
| Automação | Makefile e scripts portáveis para ambiente local |

---

## Equipe

**Author:** Gabryel-lima  
**Co-authors:** Matheus M Guedes, VthugodoNl, ana daniel

---

## Divisão por fases

| Fase | Responsável | Status no repositório |
|------|-------------|------------------------|
| Fase 1 | Colegas | Usa o template vazio compartilhado |
| Fase 2 | Colegas | Usa o template vazio compartilhado |
| Fase 3 | Colegas | Usa o template vazio compartilhado |
| Fase 4 | Gabryel-lima | Documentação e base técnica mantidas no repositório |
| Fase 5 | Colegas | Usa o template vazio compartilhado |

### Regra adotada

Para evitar misturar responsabilidades, as fases 1, 2, 3 e 5 passam a usar apenas um template vazio compartilhado em [docs/fases/template-unico-fases-1-2-3-5.md](docs/fases/template-unico-fases-1-2-3-5.md). A fase 4 permanece como a área ativa deste repositório.

---

## Por que usar Make

O `make` centraliza comandos repetitivos do projeto em uma interface única e previsível. Em vez de lembrar vários comandos longos para criar `.venv`, instalar dependências, rodar a API, executar testes e limpar caches, o grupo passa a usar alvos curtos e padronizados.

### Benefícios práticos

- reduz erros de digitação e diferenças entre máquinas;
- deixa o onboarding do grupo mais simples;
- documenta o fluxo de trabalho do projeto dentro do próprio repositório;
- facilita apresentação, demonstração e execução rápida do backend.

---

## Como instalar o Make

### Linux

| Distribuição | Comando |
|-------------|---------|
| Ubuntu / Debian | `sudo apt update && sudo apt install make` |
| Fedora | `sudo dnf install make` |
| Arch Linux | `sudo pacman -S make` |
| OpenSUSE | `sudo zypper install make` |

### Windows

Os scripts deste projeto foram escritos em `sh`, então no Windows o recomendado é usar **Git Bash** ou **WSL**.

#### Opção recomendada: Git Bash + Make

1. Instale o Git for Windows para obter `sh` e Git Bash.
2. Instale o `make` por um gerenciador de pacotes.

| Ferramenta | Comando |
|-----------|---------|
| Scoop | `scoop install make` |
| Chocolatey | `choco install make` |

Se o comando `make` não estiver disponível diretamente, tente `mingw32-make`, dependendo da instalação usada no Windows.

#### Opção alternativa: WSL

Dentro do WSL, use os mesmos comandos de instalação do Linux. Essa opção costuma oferecer a melhor compatibilidade para projetos com scripts `sh`.

---

## Primeiros comandos

```bash
make help
make install
make run
make test
```

---

## Entidades principais

| Entidade | Papel no sistema |
|----------|------------------|
| Santuário | Local que abriga os ursos resgatados |
| Cuidador | Profissional responsável pelo acompanhamento |
| Urso | Animal monitorado pelo sistema |
| Resgate | Registro da ocorrência que originou a entrada do urso |

---

## Mapa da documentação

### 1. Template compartilhado dos colegas

- [docs/fases/template-unico-fases-1-2-3-5.md](docs/fases/template-unico-fases-1-2-3-5.md)  
  Template vazio único para as fases 1, 2, 3 e 5.

### 2. Referências reservadas das fases dos colegas

- [docs/escopo.md](docs/escopo.md)  
  Arquivo reservado para a fase 1, apontando para o template compartilhado.

- [docs/uml/casos-de-uso.md](docs/uml/casos-de-uso.md)  
  Arquivo reservado para a fase 2, apontando para o template compartilhado.

- [docs/uml/diagrama-classes.md](docs/uml/diagrama-classes.md)  
  Arquivo reservado para a fase 2, apontando para o template compartilhado.

- [docs/sql/README.md](docs/sql/README.md)  
  Arquivo reservado para a fase 2, apontando para o template compartilhado.

### 3. Fase 4, sua área

- [docs/api/contrato-inicial.md](docs/api/contrato-inicial.md)  
  Contrato inicial da API REST da fase 4.

- [src/curso_backend/main.py](src/curso_backend/main.py)  
  Entrada mínima da aplicação FastAPI.

- [tests/test_app.py](tests/test_app.py)  
  Testes básicos da aplicação mínima.

### 4. Planejamento geral

- [plan/architecture-curso-backend-1.md](plan/architecture-curso-backend-1.md)  
  Plano geral do projeto, agora com separação explícita de responsabilidade por fase.

### 5. Banco de dados reservado

- [sql/schema.sql](sql/schema.sql)  
  Arquivo reservado para a modelagem SQL da fase 2.

### 6. Apoio de qualidade para a fase 4

- [tests/README.md](tests/README.md)  
  Direção inicial para testes ligados à evolução da fase 4.

---

## Estrutura do projeto

```text
docs/
  api/
  sql/
  uml/
plan/
scripts/
sql/
src/
  curso_backend/
    features/
    shared/
tests/
Makefile
```

---

## Automação disponível

| Alvo | Descrição |
|------|-----------|
| `make help` | Lista todos os comandos disponíveis |
| `make install` | Cria o `.venv` e instala dependências do projeto e de desenvolvimento |
| `make venv` | Cria apenas o ambiente virtual |
| `make run` | Inicia a API FastAPI em modo de desenvolvimento e verifica portas disponíveis |
| `make test` | Executa os testes |
| `make list_ports` | Lista as portas em uso no sistema |
| `make lint` | Executa verificações básicas de qualidade |
| `make check` | Executa lint e testes em sequência |
| `make clean` | Remove caches e arquivos temporários |
| `make clean-venv` | Remove o ambiente virtual |
| `make info` | Exibe informações úteis do ambiente atual |

---

## Direção técnica

| Item | Escolha |
|------|---------|
| Linguagem | Python |
| Framework API | FastAPI |
| Banco de dados | MySQL |
| Organização | Feature-first em `src/curso_backend/features` |
| Formato de resposta | JSON |
| Automação | Makefile + scripts `sh` portáveis |

---

## Próximos passos

1. Você pode continuar a implementação da fase 4 a partir de [docs/api/contrato-inicial.md](docs/api/contrato-inicial.md).
2. Seus colegas podem duplicar o template compartilhado para trabalhar nas fases 1, 2, 3 e 5 fora do fluxo principal do repositório.
3. Quando as outras fases estiverem fechadas pelo grupo, o material final pode ser reintegrado de forma controlada.

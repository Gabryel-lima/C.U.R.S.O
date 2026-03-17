---
goal: Estruturar a base documental e técnica inicial do projeto C.U.R.S.O
version: 1.0
date_created: 2026-03-16
last_updated: 2026-03-16
owner: Grupo C.U.R.S.O
status: In progress
tags: [architecture, feature, backend, documentation, mysql, python]
---

# Introduction

![Status: In progress](https://img.shields.io/badge/status-In%20progress-yellow)

Este plano define a base inicial do backend acadêmico C.U.R.S.O, cobrindo documentação, modelagem, banco de dados e esqueleto técnico mínimo para as próximas fases do trabalho.

## Navegação

- [1. Requirements & Constraints](#1-requirements--constraints)
- [2. Implementation Steps](#2-implementation-steps)
- [3. Alternatives](#3-alternatives)
- [4. Dependencies](#4-dependencies)
- [5. Files](#5-files)
- [6. Testing](#6-testing)
- [7. Risks & Assumptions](#7-risks--assumptions)
- [8. Related Specifications / Further Reading](#8-related-specifications--further-reading)
- [Credits](#credits)

## 1. Requirements & Constraints

- **REQ-001**: O projeto deve representar um backend completo para um sistema de informação.
- **REQ-002**: O sistema deve possuir no mínimo 3 a 4 entidades principais.
- **REQ-003**: A modelagem UML deve manter coerência com o código e com o banco de dados.
- **REQ-004**: A API deve expor operações CRUD por meio de endpoints REST.
- **DBS-001**: O banco de dados alvo deve ser MySQL.
- **SEC-001**: O projeto deve prever validação de entrada e integridade referencial no banco.
- **CON-001**: Nesta etapa não será implementada lógica de negócio completa.
- **CON-002**: A estrutura inicial deve ser suficiente para orientar as fases 3 e 4 sem excesso de arquivos vazios.
- **PAT-001**: A organização do código deve seguir orientação por feature.
- **GUD-001**: A documentação deve estar em português para facilitar a apresentação acadêmica.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Fase reservada aos colegas, usando o template vazio compartilhado.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Criar README principal com contexto, escopo e estrutura do repositório |  | 2026-03-16 |
| TASK-002 | Documentar o escopo funcional e as entidades principais em Markdown |  | 2026-03-16 |
| TASK-003 | Registrar os diagramas iniciais de casos de uso e classes em Markdown |  | 2026-03-16 |

### Implementation Phase 2

- GOAL-002: Fase reservada aos colegas, usando o template vazio compartilhado.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-004 | Criar script SQL inicial |  | 2026-03-16 |
| TASK-005 | Definir contrato inicial da API REST com rotas e status esperados |  | 2026-03-16 |
| TASK-006 | Criar esqueleto Python com empacotamento e pastas por feature |  | 2026-03-16 |

### Implementation Phase 3

- GOAL-003: Fase reservada aos colegas, usando o template vazio compartilhado.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-007 | Implementar classes de domínio coerentes com o diagrama de classes |  |  |
| TASK-008 | Implementar conexão com MySQL e operações de persistência por feature |  |  |
| TASK-009 | Criar testes unitários e de integração para a camada de domínio e dados |  |  |

### Implementation Phase 4

- GOAL-004: Expor a funcionalidade por uma API REST consistente, como responsabilidade ativa de Gabryel-lima.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-010 | Implementar schemas de entrada e saída para cada entidade |  |  |
| TASK-011 | Implementar rotas CRUD para ursos, resgates, santuários e cuidadores |  |  |
| TASK-012 | Validar status codes, erros e integração com banco de dados |  |  |

## 3. Alternatives

- **ALT-001**: Usar arquitetura por camadas tradicionais. Não foi escolhida porque aumentaria o espalhamento de arquivos para um projeto acadêmico pequeno.
- **ALT-002**: Começar direto pela implementação da API. Não foi escolhido porque o trabalho exige coerência entre escopo, UML, banco e código.
- **ALT-003**: Reduzir o sistema para apenas três entidades. Não foi escolhido porque quatro entidades demonstram melhor relacionamentos e POO.

## 4. Dependencies

- **DEP-001**: Python 3.12 ou superior.
- **DEP-002**: FastAPI para a camada HTTP.
- **DEP-003**: MySQL 8 para persistência.
- **DEP-004**: Ferramenta de testes de API como Postman, Insomnia ou Swagger UI.

## 5. Files

- **FILE-001**: `README.md`
- **FILE-002**: `docs/escopo.md`
- **FILE-003**: `docs/uml/casos-de-uso.md`
- **FILE-004**: `docs/uml/diagrama-classes.md`
- **FILE-005**: `sql/schema.sql`
- **FILE-006**: `docs/api/contrato-inicial.md`
- **FILE-007**: `pyproject.toml`
- **FILE-008**: `src/curso_backend/`
- **FILE-009**: `tests/README.md`

## 6. Testing

- **TEST-001**: Validar manualmente a coerência entre entidades, diagrama de classes e script SQL.
- **TEST-002**: Verificar se a estrutura de pastas atende à organização por feature.
- **TEST-003**: Na próxima etapa, executar testes unitários e de integração antes da implementação da API.

## 7. Risks & Assumptions

- **RISK-001**: O professor pode solicitar ajuste no tema ou nas entidades principais.
- **RISK-002**: A equipe pode decidir usar outro framework Python, exigindo ajuste do empacotamento.
- **ASSUMPTION-001**: FastAPI foi adotado como base por facilitar documentação automática e testes.
- **ASSUMPTION-002**: O fluxo principal do sistema é registrar resgates e administrar a permanência dos ursos no santuário.

## 8. Related Specifications / Further Reading

- `docs/fases/template-unico-fases-1-2-3-5.md`
- `docs/api/contrato-inicial.md`

## Credits

**Author:** Gabryel-lima  
**Co-authors:** Matheus M Guedes, VthugodoNl, ana daniel
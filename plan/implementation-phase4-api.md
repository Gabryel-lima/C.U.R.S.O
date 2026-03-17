# Fase 4 API REST - Implementation Plan
## 1. 🎯 Objective
Implementar a fase 4 do backend como uma API REST funcional para santuários, cuidadores, ursos e resgates, mantendo a base pronta para trocar a persistência em memória por integração real com banco nas próximas evoluções.

## 2. 🏗️ Tech Strategy
- **Pattern:** Vertical slice por feature com `router`, `schemas` e `service` dentro de cada módulo.
- **State:** Persistência em memória encapsulada por serviços e dependências compartilhadas, sem acoplamento da API ao armazenamento.
- **Constraints:** Respeitar `docs/api/contrato-inicial.md`, usar UUID gerado pela aplicação, Problem Details para erros e cobrir cenários de conflito e vínculo ativo.

## 3. 📂 File Changes
| Action | File Path | Brief Purpose |
|:-------|:----------|:--------------|
| [NEW] | `plan/implementation-phase4-api.md` | Registrar o plano curto da fase 4 |
| [NEW] | `tests/test_phase4_api.py` | Definir o contrato dos CRUDs e cenários de erro |
| [MOD] | `src/curso_backend/main.py` | Compor a aplicação FastAPI com os routers |
| [NEW] | `src/curso_backend/shared/` | Centralizar erro HTTP, IDs e estado compartilhado |
| [NEW] | `src/curso_backend/features/*/` | Implementar schemas, serviços e rotas por feature |
| [MOD] | `docs/api/contrato-inicial.md` | Refinar payloads e regras após a implementação |

## 4. 👣 Execution Sequence
1. **TDD:** Criar testes de contrato para CRUDs e falhas principais.
2. **Foundation:** Adicionar utilitários compartilhados de erro e estado.
3. **Slices:** Implementar santuários, cuidadores, ursos e resgates por feature.
4. **Compose:** Registrar routers e dependências na aplicação.
5. **Docs:** Atualizar contrato com os schemas finais.
6. **Verify:** Executar testes e lint.

## 5. ✅ Verification Standards
- [ ] `pytest -q`
- [ ] `ruff check src tests`
- [ ] CRUDs respondem sob `/api/v1`
- [ ] Respostas de erro usam `type`, `title`, `status` e `detail`
- [ ] Exclusões com vínculos ativos retornam `409 Conflict`
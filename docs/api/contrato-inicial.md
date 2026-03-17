# Contrato Inicial da API

> Documento base para orientar a implementação dos endpoints REST do projeto.

![API](https://img.shields.io/badge/API-REST%20contract-F59E0B)

## Navegação rápida

- [Convenções](#convenções)
- [Recursos](#recursos)
- [Regras de resposta planejadas](#regras-de-resposta-planejadas)
- [Observações](#observações)
- [Créditos](#créditos)

---

## Convenções

| Item | Definição |
|------|-----------|
| Base URL | `/api/v1` |
| Formato de resposta | `application/json` |
| Identificadores | UUID gerado pela aplicação |
| Erros | Estrutura com `type`, `title`, `status` e `detail` |

## Recursos

### Santuários

| Metodo | Rota | Objetivo | Retorno esperado |
|--------|------|----------|------------------|
| GET | `/api/v1/santuarios` | Listar santuários | `200 OK` |
| GET | `/api/v1/santuarios/{id}` | Buscar santuário por id | `200 OK` / `404 Not Found` |
| POST | `/api/v1/santuarios` | Criar santuário | `201 Created` |
| PUT | `/api/v1/santuarios/{id}` | Atualizar santuário | `200 OK` / `404 Not Found` |
| DELETE | `/api/v1/santuarios/{id}` | Remover santuário | `204 No Content` / `404 Not Found` / `409 Conflict` |

### Cuidadores

| Metodo | Rota | Objetivo | Retorno esperado |
|--------|------|----------|------------------|
| GET | `/api/v1/cuidadores` | Listar cuidadores | `200 OK` |
| GET | `/api/v1/cuidadores/{id}` | Buscar cuidador por id | `200 OK` / `404 Not Found` |
| POST | `/api/v1/cuidadores` | Criar cuidador | `201 Created` / `409 Conflict` |
| PUT | `/api/v1/cuidadores/{id}` | Atualizar cuidador | `200 OK` / `404 Not Found` |
| DELETE | `/api/v1/cuidadores/{id}` | Remover cuidador | `204 No Content` / `404 Not Found` / `409 Conflict` |

### Ursos

| Metodo | Rota | Objetivo | Retorno esperado |
|--------|------|----------|------------------|
| GET | `/api/v1/ursos` | Listar ursos | `200 OK` |
| GET | `/api/v1/ursos/{id}` | Buscar urso por id | `200 OK` / `404 Not Found` |
| POST | `/api/v1/ursos` | Criar urso | `201 Created` |
| PUT | `/api/v1/ursos/{id}` | Atualizar urso | `200 OK` / `404 Not Found` / `409 Conflict` |
| DELETE | `/api/v1/ursos/{id}` | Remover urso | `204 No Content` / `404 Not Found` |

### Resgates

| Metodo | Rota | Objetivo | Retorno esperado |
|--------|------|----------|------------------|
| GET | `/api/v1/resgates` | Listar resgates | `200 OK` |
| GET | `/api/v1/resgates/{id}` | Buscar resgate por id | `200 OK` / `404 Not Found` |
| POST | `/api/v1/resgates` | Registrar resgate | `201 Created` / `409 Conflict` |
| PUT | `/api/v1/resgates/{id}` | Atualizar resgate | `200 OK` / `404 Not Found` |
| DELETE | `/api/v1/resgates/{id}` | Remover resgate | `204 No Content` / `404 Not Found` |

## Regras de resposta planejadas

- `200 OK` para leituras e atualizações bem-sucedidas.
- `201 Created` para criação de registros.
- `204 No Content` para exclusão sem corpo de resposta.
- `404 Not Found` quando o recurso não existir.
- `409 Conflict` para conflitos de integridade, como email duplicado ou tentativa de exclusão com vínculos ativos.
- `422 Unprocessable Entity` para validação de payload na camada da API.

## Observações

- A implementação futura deve separar validação, lógica e acesso a dados por feature.
- O contrato pode ser refinado após a definição final dos schemas Pydantic e das regras do grupo.

## Créditos

**Author:** Gabryel-lima  
**Co-authors:** Matheus M Guedes, VthugodoNl, ana daniel
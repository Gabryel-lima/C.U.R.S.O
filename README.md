<div align="center">
<h1>C.U.R.S.O</h1>

**Centro de União, Resgate e Santuário dos Ursos**

[![Status](https://img.shields.io/badge/status-backend%20funcional-green)](#)
[![Curso](https://img.shields.io/badge/Senai-Desenvolvimento%20Backend-red)](#)
[![Stack](https://img.shields.io/badge/Stack-Node.js%20%2B%20SQLite-339933)](#)

<img src="docs/curso.png" alt="Logo do C.U.R.S.O" width="400">

Projeto acadêmico focado em modelagem de dados e construção de uma API REST para o gerenciamento de ursos resgatados e santuários.
*Desenvolvido para o curso de Desenvolvimento Backend do Senai.*

</div>

Projeto acadêmico desenvolvido para o curso de Desenvolvimento Backend do Senai, com foco na modelagem, persistência de dados e construção de uma API REST em Node.js para o gerenciamento de ursos resgatados e santuários.

---

## Sumário

- [Visão geral](#visão-geral)
- [Equipe](#equipe)
- [Divisão por fases](#divisão-por-fases)
- [Por que usar npm scripts](#por-que-usar-npm-scripts)
- [Primeiros comandos](#primeiros-comandos)
- [Mapa da documentação](#mapa-da-documentação)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Automação disponível](#automação-disponível)
- [Direção técnica](#direção-técnica)

---

## Visão geral

O sistema C.U.R.S.O foi definido como uma plataforma para registrar ursos resgatados, controlar o encaminhamento para santuário, organizar cuidadores e manter o histórico operacional dos resgates.

### Entregas desta base

| Área | Conteúdo |
|------|----------|
| Escopo | Definição do problema, objetivo e CRUDs principais |
| UML | Casos de uso e diagrama de classes em Markdown |
| Banco de dados | Schema alinhado ao diagrama relacional em SQLite |
| API | CRUD base para os principais recursos via Express |
| Backend | Inicialização segura do banco e rotas organizadas por entidade |
| Automação | Scripts npm e instruções para desenvolvimento local |

---

## Equipe

**Author:** Gabryel-lima  
**Co-authors:** Matheus M Guebel, VthugodoNL, ana daniel

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

- Cada fase é responsabilidade de um colega, mas o repositório é compartilhado para que todos possam acompanhar e contribuir.
- A fase 4, que envolve a construção do backend, é mantida por mim (Gabryel-lima) para garantir consistência técnica, mas os colegas podem sugerir melhorias ou correções via pull request.

---

## Por que usar npm scripts

Os scripts `npm` centralizam comandos repetitivos do projeto em uma interface única e previsível. Em vez de lembrar vários comandos longos, o grupo passa a usar alvos curtos e padronizados.

### Benefícios práticos

- reduz erros de digitação e diferenças entre máquinas;
- deixa o onboarding do grupo mais simples;
- documenta o fluxo de trabalho do projeto dentro do próprio repositório;
- facilita demonstração e execução rápida do backend.

---

## Primeiros comandos

```bash
npm install
npm run dev    # desenvolvimento com reload (nodemon)
npm start      # start em produção
```

Se existir uma suíte de testes, rode `npm test`.

---

## Mapa da documentação
- [db/scripts.sql](db/scripts.sql) — schema SQL inicial
- [docs/diagrama-db.png](docs/diagrama-db.png) — diagrama de banco usado como referência
- [src/README.md](src/README.md) — (se existir) notas específicas do código

---

## Estrutura do projeto

```
package.json
README.md
db/
  scripts.sql
  dev.sqlite (gerado)
docs/
  README.md
  curso.png
  diagrama-db.png
  diagrama-de-classes.png
src/
  index.js
  db/
    initDb.js
    sqliteHelpers.js
  models/
    BaseModel.js
    Cidadao.js
    Funcionario.js
    Atendente.js
    Guia.js
    Veterinario.js
    Cuidador.js
    Emergencia.js
    Ocorrencia.js
    Urso.js
    Diagnostico.js
  routes/
    atendentes.js
    cidadao.js
    createCrudRouter.js
    cuidadores.js
    diagnosticos.js
    emergencias.js
    funcionarios.js
    guias.js
    ocorrencias.js
    ursos.js
    veterinarios.js
```

---

## Automação disponível

| Alvo | Descrição |
|------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento (nodemon) |
| `npm start` | Inicia o servidor com `node` |
| `npm run db:init` | Recria o banco SQLite local a partir de `db/scripts.sql` |
| `node src/db/initDb.js` | Inicializa o banco somente quando necessário |

---

## Recursos disponíveis

Os endpoints principais expostos pela API são:

- `GET /funcionarios` — visão agregada de atendentes, guias, veterinários e cuidadores
- `GET|POST|PUT|DELETE /cidadaos`
- `GET|POST|PUT|DELETE /atendentes`
- `GET|POST|PUT|DELETE /guias`
- `GET|POST|PUT|DELETE /veterinarios`
- `GET|POST|PUT|DELETE /cuidadores`
- `GET|POST|PUT|DELETE /emergencias`
- `GET|POST|PUT|DELETE /ocorrencias`
- `GET|POST|PUT|DELETE /ursos`
- `GET|POST|PUT|DELETE /diagnosticos`

---

## Banco de dados & execução local

Este repositório usa SQLite por padrão para desenvolvimento. Para criar ou recriar o banco localmente:

```bash
# primeira subida da API cria o schema automaticamente quando o banco não existe
npm start

# para recriar o banco com os dados de exemplo do scripts.sql
npm run db:init
```

O arquivo do banco fica em `db/dev.sqlite` por padrão.

Quando o banco já está com o schema novo, a aplicação não faz reset automático ao subir. O reset completo só ocorre quando você chama `npm run db:init` ou executa `node src/db/initDb.js --force`.

Se preferir usar outra base (MySQL, Postgres), adapte as rotas e o inicializador de DB conforme necessário.

---

## Contribuindo

1. Faça um fork / clone do repositório.
2. Crie uma branch com a sua feature ou correção.
3. Abra um pull request descrevendo a mudança.

Pequenas correções (typos, documentação) são bem-vindas.

---

## Direção técnica

| Item | Escolha |
|------|---------|
| Linguagem | Node.js |
| Framework API | Express |
| Banco de dados (dev) | SQLite |
| Organização | Feature-first em `src/` |
| Formato de resposta | JSON |

---

## Observações

- A aplicação expõe a API em `http://localhost:3000` por padrão (variável `PORT` para alterar).
- O backend está padronizado em CommonJS para evitar conflito entre `require` e arquivos `.mjs`.

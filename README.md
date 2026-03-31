<div align="center">
<h1>C.U.R.S.O</h1>

**Centro de União, Resgate e Santuário dos Ursos**

[![Status](https://img.shields.io/badge/status-base%20inicial-blue)](#)
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
| Banco de dados | Estrutura inicial em SQL (SQLite para desenvolvimento) |
| API | Contrato inicial REST com rotas e respostas usando Express |
| Backend | Esqueleto mínimo em Node.js para evolução futura |
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
  models/
    Funcionario.mjs
  routes/
    funcionarios.js
    cidadao.js
```

---

## Automação disponível

| Alvo | Descrição |
|------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento (nodemon) |
| `npm start` | Inicia o servidor com `node` |
| `node src/db/initDb.js` | Inicializa/cria o banco SQLite a partir de `db/scripts.sql` (exemplo de uso) |

---

## Banco de dados & execução local

Este repositório usa SQLite por padrão para desenvolvimento. Para criar ou recriar o banco localmente:

```bash
# cria o DB aplicando o schema
node -e "require('./src/db/initDb').initDb().then(()=>console.log('DB inicializado')).catch(err=>{console.error(err); process.exit(1)})"
```

O arquivo do banco fica em `db/dev.sqlite` por padrão.

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
- Alguns arquivos usam módulos `.mjs` enquanto outros usam CommonJS — ao expandir o projeto, alinhe o padrão de módulos (ou utilize `type": "module"` em `package.json`).

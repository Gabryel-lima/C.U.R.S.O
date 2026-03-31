const express = require('express');
const { initDb } = require('./db/initDb');
const funcionariosRouter = require('./routes/funcionarios');

const app = express();
app.use(express.json());

(async function start() {
  try {
    const db = await initDb();
    app.locals.db = db;
    app.use('/funcionarios', funcionariosRouter);
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  } catch (err) {
    console.error('Erro inicializando DB:', err);
    process.exit(1);
  }
})();

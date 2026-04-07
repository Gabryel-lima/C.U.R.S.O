const express = require('express');
const { initDb } = require('./db/initDb');
const atendentesRouter = require('./routes/atendentes');
const cidadaosRouter = require('./routes/cidadao');
const cuidadoresRouter = require('./routes/cuidadores');
const diagnosticosRouter = require('./routes/diagnosticos');
const emergenciasRouter = require('./routes/emergencias');
const funcionariosRouter = require('./routes/funcionarios');
const guiasRouter = require('./routes/guias');
const ocorrenciasRouter = require('./routes/ocorrencias');
const ursosRouter = require('./routes/ursos');
const veterinariosRouter = require('./routes/veterinarios');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    nome: 'C.U.R.S.O API',
    recursos: [
      '/funcionarios',
      '/cidadaos',
      '/atendentes',
      '/guias',
      '/veterinarios',
      '/cuidadores',
      '/emergencias',
      '/ocorrencias',
      '/ursos',
      '/diagnosticos'
    ]
  });
});

/** Constrói a resposta de erro adequada com base no tipo de erro.
 * @param {Error} error - Objeto de erro
 * @returns {Object} Objeto contendo o status HTTP e a mensagem de erro
 */
function buildErrorResponse(error) {
  if (error.code === 'SQLITE_CONSTRAINT') {
    if (error.message.includes('FOREIGN KEY')) {
      return { status: 400, message: 'Referência inválida para um registro relacionado.' };
    }

    if (error.message.includes('UNIQUE')) {
      return { status: 409, message: 'Já existe um registro com esse identificador.' };
    }

    return { status: 400, message: 'Violação de integridade no banco de dados.' };
  }

  if (error.statusCode) {
    return { status: error.statusCode, message: error.message };
  }

  if (error.message && error.message.startsWith('Campo ')) {
    return { status: 400, message: error.message };
  }

  return { status: 500, message: 'Erro interno do servidor.' };
}

(async function start() {
  try {
    const db = await initDb();
    app.locals.db = db;

    app.use('/funcionarios', funcionariosRouter);
    app.use('/cidadaos', cidadaosRouter);
    app.use('/atendentes', atendentesRouter);
    app.use('/guias', guiasRouter);
    app.use('/veterinarios', veterinariosRouter);
    app.use('/cuidadores', cuidadoresRouter);
    app.use('/emergencias', emergenciasRouter);
    app.use('/ocorrencias', ocorrenciasRouter);
    app.use('/ursos', ursosRouter);
    app.use('/diagnosticos', diagnosticosRouter);

    app.use((_req, res) => {
      res.status(404).json({ error: 'Rota não encontrada' });
    });

    app.use((error, _req, res, _next) => {
      const response = buildErrorResponse(error);

      if (response.status >= 500) {
        console.error(error);
      }

      res.status(response.status).json({ error: response.message });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  } catch (err) {
    console.error('Erro inicializando DB:', err);
    process.exit(1);
  }
})();

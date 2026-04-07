const express = require('express');
const { allRows, getRow, runStatement } = require('../db/sqliteHelpers');

/** Recebe um identificador bruto e retorna um número válido.
 * @param {string|number} rawId - Identificador bruto
 * @returns {number} Identificador válido
 * @throws {Error} Se o identificador for inválido
 */
function parseId(rawId) {
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('Identificador inválido.');
    error.statusCode = 400;
    throw error;
  }

  return id;
}

/** Extrai os campos permitidos de uma fonte de dados.
 * @param {Object} source - Fonte de dados
 * @param {string[]} writableFields - Campos permitidos
 * @returns {Object} Objeto contendo apenas os campos permitidos
 */
function extractPayload(source, writableFields) {
  return writableFields.reduce((payload, fieldName) => {
    if (Object.prototype.hasOwnProperty.call(source, fieldName)) {
      payload[fieldName] = source[fieldName];
    }

    return payload;
  }, {});
}

/** Obtém a instância do banco de dados a partir do request.
 * @param {Object} req - Objeto de request do Express
 * @param {Object} res - Objeto de response do Express
 * @returns {Object|null} Instância do banco de dados ou null se não inicializado
 */
function getDb(req, res) {
  const db = req.app?.locals?.db;

  if (!db) {
    res.status(503).json({ error: 'DB não inicializado' });
    return null;
  }

  return db;
}

/** Cria um roteador CRUD para um modelo específico.
 * @param {Object} options - Opções de configuração
 * @param {string} options.tableName - Nome da tabela no banco de dados
 * @param {Function} options.Model - Classe do modelo
 * @param {string[]} options.writableFields - Campos permitidos para escrita
 * @param {string} [options.orderBy='id ASC'] - Ordem padrão para listagem
 * @returns {Object} Roteador do Express configurado
 */
function createCrudRouter({ tableName, Model, writableFields, orderBy = 'id ASC' }) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const db = getDb(req, res);
    if (!db) return;

    try {
      const rows = await allRows(db, `SELECT * FROM ${tableName} ORDER BY ${orderBy}`);
      res.json(rows.map((row) => Model.fromRow(row)));
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const db = getDb(req, res);
    if (!db) return;

    try {
      const id = parseId(req.params.id);
      const row = await getRow(db, `SELECT * FROM ${tableName} WHERE id = ?`, [id]);

      if (!row) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }

      res.json(Model.fromRow(row));
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const db = getDb(req, res);
    if (!db) return;

    try {
      const model = new Model(extractPayload(req.body || {}, writableFields));
      model.validate();

      const row = model.toRow();
      const insertFields = writableFields.filter((fieldName) => row[fieldName] !== undefined);
      const placeholders = insertFields.map(() => '?').join(', ');
      const values = insertFields.map((fieldName) => row[fieldName]);

      const result = await runStatement(
        db,
        `INSERT INTO ${tableName} (${insertFields.join(', ')}) VALUES (${placeholders})`,
        values
      );

      const createdRow = await getRow(db, `SELECT * FROM ${tableName} WHERE id = ?`, [result.lastID]);
      res.status(201).json(Model.fromRow(createdRow));
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const db = getDb(req, res);
    if (!db) return;

    try {
      const id = parseId(req.params.id);
      const currentRow = await getRow(db, `SELECT * FROM ${tableName} WHERE id = ?`, [id]);

      if (!currentRow) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }

      const payload = extractPayload(req.body || {}, writableFields);
      const model = new Model({ ...currentRow, ...payload, id });
      model.validate();

      const nextRow = model.toRow();
      const updateFields = writableFields.filter((fieldName) => nextRow[fieldName] !== undefined);
      const assignments = updateFields.map((fieldName) => `${fieldName} = ?`).join(', ');
      const values = updateFields.map((fieldName) => nextRow[fieldName]);

      await runStatement(db, `UPDATE ${tableName} SET ${assignments} WHERE id = ?`, [...values, id]);

      const updatedRow = await getRow(db, `SELECT * FROM ${tableName} WHERE id = ?`, [id]);
      res.json(Model.fromRow(updatedRow));
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const db = getDb(req, res);
    if (!db) return;

    try {
      const id = parseId(req.params.id);
      const result = await runStatement(db, `DELETE FROM ${tableName} WHERE id = ?`, [id]);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = createCrudRouter;

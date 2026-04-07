const express = require('express');
const Funcionario = require('../models/Funcionario');
const { allRows } = require('../db/sqliteHelpers');

const router = express.Router();

/** Tabelas de funcionários por papel */
const STAFF_TABLES = {
  atendente: 'atendente',
  cuidador: 'cuidador',
  guia: 'guia',
  veterinario: 'veterinario'
};

/** Gera a consulta SQL para selecionar funcionários por papel.
 * @param {string} tableName - Nome da tabela
 * @param {string} papel - Papel do funcionário
 * @returns {string} Consulta SQL
 */
function selectByRole(tableName, papel) {
  return `SELECT id, nome, registro, '${papel}' AS papel FROM ${tableName}`;
}

router.get('/', async (req, res, next) => {
  const db = req.app?.locals?.db;
  if (!db) return res.status(503).json({ error: 'DB não inicializado' });

  try {
    const { papel } = req.query;
    let sql;

    if (papel) {
      const tableName = STAFF_TABLES[papel];

      if (!tableName) {
        return res.status(400).json({ error: 'Papel inválido. Use atendente, cuidador, guia ou veterinario.' });
      }

      sql = `${selectByRole(tableName, papel)} ORDER BY nome ASC`;
    } else {
      sql = [
        selectByRole('atendente', 'atendente'),
        selectByRole('cuidador', 'cuidador'),
        selectByRole('guia', 'guia'),
        selectByRole('veterinario', 'veterinario')
      ].join(' UNION ALL ');
      sql = `${sql} ORDER BY papel ASC, nome ASC`;
    }

    const rows = await allRows(db, sql);
    res.json(rows.map((row) => Funcionario.fromRow(row)));
  } catch (error) {
    next(error);
  }
});

module.exports = router;

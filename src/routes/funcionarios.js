const express = require('express');

const router = express.Router();

// GET /funcionarios - lista todos (usa DB se disponível)
router.get('/', async (req, res, next) => {
  const db = req.app && req.app.locals && req.app.locals.db;
  if (!db) return res.status(503).json({ error: 'DB não inicializado' });

  let Funcionario;
  try {
    ({ Funcionario } = await import('../models/Funcionario.mjs'));
  } catch (err) {
    return next(err);
  }

  db.all('SELECT * FROM funcionario', (err, rows) => {
    if (err) return next(err);
    const funcionarios = rows.map(r => (Funcionario.fromRow ? Funcionario.fromRow(r) : r));
    res.json(funcionarios);
  });
});

// POST /funcionarios/:id/acao - executa uma ação específica dependendo do papel do funcionário
router.post('/:id/acao', (req, res, next) => {
  const db = req.app && req.app.locals && req.app.locals.db;
  if (!db) return res.status(503).json({ error: 'DB não inicializado' });

  const id = req.params.id;
  db.get('SELECT * FROM funcionario WHERE id = ?', [id], async (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: 'Funcionario não encontrado' });

    const papel = row.papel || row.role || 'funcionario';

    let Classe;
    try {
      if (papel === 'atendente') {
        ({ Atendente: Classe } = await import('../models/Atendente.mjs'));
      } else if (papel === 'cuidador') {
        ({ Cuidador: Classe } = await import('../models/Cuidador.mjs'));
      } else if (papel === 'veterinario') {
        ({ Veterinario: Classe } = await import('../models/Veterinario.mjs'));
      } else if (papel === 'guia') {
        ({ Guia: Classe } = await import('../models/Guia.mjs'));
      } else {
        ({ Funcionario: Classe } = await import('../models/Funcionario.mjs'));
      }
    } catch (e) {
      return next(e);
    }

    const instance = (Classe.fromRow ? Classe.fromRow(row) : new Classe(row));

    const { action, params } = req.body || {};
    if (!action) return res.status(400).json({ error: 'Ação não informada' });

    if (typeof instance[action] !== 'function') {
      return res.status(400).json({ error: `Ação inválida para papel ${papel}: ${action}` });
    }

    let args = [];
    if (Array.isArray(params)) {
      args = params;
    } else if (params && typeof params === 'object') {
      args = instance[action].length === 1 ? [params] : Object.values(params);
    } else if (typeof params !== 'undefined') {
      args = [params];
    }

    try {
      const result = await instance[action](...args);
      res.json({ result });
    } catch (e) {
      next(e);
    }
  });
});

module.exports = router;

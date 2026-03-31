const express = require('express');
const Funcionario = require('../models/Funcionario');

const router = express.Router();

// GET /funcionarios - lista todos (usa DB se disponível)
router.get('/', (req, res, next) => {
  const db = req.app && req.app.locals && req.app.locals.db;
  if (!db) return res.status(503).json({ error: 'DB não inicializado' });

  db.all('SELECT * FROM funcionario', (err, rows) => {
    if (err) return next(err);
    const funcionarios = rows.map(r => Funcionario.fromRow(r));
    res.json(funcionarios);
  });
});

module.exports = router;

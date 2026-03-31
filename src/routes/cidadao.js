const express = require("express");
const Cidadao = require("../models/Cidadao");

const router = express.Router();

// GET /cidadaos - lista todos (usa DB se disponível)
router.get("/", (req, res, next) => {
  const db = req.app && req.app.locals && req.app.locals.db;
  if (!db) return res.status(503).json({ error: "DB não inicializado" });

  db.all("SELECT * FROM cidadao", (err, rows) => {
    if (err) return next(err);
    const cidadaos = rows.map((r) => Cidadao.fromRow(r));
    res.json(cidadaos);
  });
});

module.exports = router;

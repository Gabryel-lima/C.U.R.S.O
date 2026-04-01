const express = require("express");

const router = express.Router();

// GET /cidadaos - lista todos (usa DB se disponível)
router.get("/", async (req, res, next) => {
  const db = req.app && req.app.locals && req.app.locals.db;
  if (!db) return res.status(503).json({ error: "DB não inicializado" });

  let Cidadao;
  try {
    ({ Cidadao } = await import("../models/Cidadao.mjs"));
  } catch (err) {
    return next(err);
  }

  db.all("SELECT * FROM cidadao", (err, rows) => {
    if (err) return next(err);
    const cidadaos = rows.map((r) => (Cidadao.fromRow ? Cidadao.fromRow(r) : r));
    res.json(cidadaos);
  });
});

// POST /cidadaos/solicitar - solicitar resgate de animal
router.post("/solicitar", async (req, res, next) => {
  let Cidadao;
  try {
    ({ Cidadao } = await import("../models/Cidadao.mjs"));
  } catch (err) {
    return next(err);
  }

  const { nome, cpf, telefone, email, endereco, descricao, localizacao } = req.body || {};
  if (!nome || !descricao || !localizacao) {
    return res.status(400).json({ error: "Campos obrigatórios: nome, descricao, localizacao" });
  }

  const cidadao = new Cidadao({ nome, cpf, telefone, email, endereco });
  const ocorrencia = cidadao.solicitarResgate(descricao, localizacao);
  res.status(201).json(ocorrencia);
});

module.exports = router;

import express from 'express';

const roteador = express.Router();

roteador.post("/veterinarios/", async (req, res) => {
	/*
	const nome = req.body.nome_completo;
	const tel = req.body.id;
	const endereco = req.body registro;
	*/
	const {id, nome_completo, registro} = req.body;
	console.log(nome_completo);
	res.status(201).json({
		id,
		nome_completo,
		registro
	}).end();
});

export default roteador;
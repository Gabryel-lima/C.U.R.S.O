import express from 'express';

const roteador = express.Router();

roteador.delete("/veterinarios/:id", async(req, res) => {
	//const {id} = req.params;
	const id = req.params.id;

	const listaIds = id.split(",").map(id => id.trim());

	console.log(listaIds);
	res.status(204).end();
});

export default roteador;
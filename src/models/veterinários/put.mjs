import express from 'express';

const roteador = express.Router();

roteador.put("/veterinarios/:id", async(req, res) => {
	const {id} = req.params;
	console.log(isNaN(id), typeof(id));
	console.log(typeof(Number(id)), console.log(Number(id)));
	const {
        id,
		nome_completo,
		registro,
	} = req.body;

	console.log(id);

	console.table(req.body.nome_completo, registro);

	try {
		if(!nome_completo){
			throw new Error("nome_completo está undefined");
		}
		res.status(200).json({mensagem: "usuario alterado"}).end();
	} catch (error) {
		res.status(400).json({erro: error.message}).end();
	}

});

export default roteador;
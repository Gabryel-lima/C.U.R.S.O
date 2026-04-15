import express from 'express'; 

/** Roteador para as rotas de veterinários
 *  @author ana daniel
 *  @date 2026-04-09
 *  @file veterinario.js
 *  @description Define as rotas relacionadas aos veterinários.
 */
const roteador = express.Router();

roteador.get("/veterinarios", async (req, res) =>{
    try{
        res.status(200).json({veterinario: "Dados veterinario"}).end()
    }catch(error){
        res.status(400).json({error: "Erro ao consultar dados do veterinario"}).end()
    }
})

roteador.post("/veterinarios/", async (req, res) => {
	/*
	const id= req.body.id;
	const nome = req.body.nome;
	const registro = req.body.registro;
	*/
	const {id, nome, registro} = req.body;
	console.log(nome);
	res.status(201).json({
		id,
		nome,
		registro
	}).end();
});

roteador.put("/veterinarios/:id", async(req, res) => {
	const {id} = req.params;
	console.log(isNaN(id), typeof(id));
	console.log(typeof(Number(id)), console.log(Number(id)));
	const {
		id,
		nome,
        registro
	} = req.body;

	console.log(id);

	console.table(req.body.nome, registro);

	try {
		if(!nome){
			throw new Error("nome está undefined");
		}
		res.status(200).json({mensagem: "usuario alterado"}).end();
	} catch (error) {
		res.status(400).json({erro: error.message}).end();
	}

});

roteador.delete("/veterinarios/:id", async(req, res) => {
	//const {id} = req.params;
	const id = req.params.id;

	const listaIds = id.split(",").map(id => id.trim());

	console.log(listaIds);
	res.status(204).end();
});

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador; 

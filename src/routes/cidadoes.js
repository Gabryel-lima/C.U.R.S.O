import express from 'express';

/** Roteador para as rotas de cidadao
 *  @author VthugodoNL
 *  @date 2026-04-01
 *  @file cidadao.js
 *  @description Define as rotas relacionadas aos cidadaos.
 */
const roteador = express.Router();

//GET
roteador.get("/cidadaos", async(req, res) => {
    try{
      res.status(200).json({cidadao:"Dados Cidadao"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao consulta o Cidadao"}).end()
    }
});

//POST
roteador.post("/cidadaos/", async(req, res) => {

  const{nome, numero} = req.body;
  console.log(nome);

  res.status(201).json({
    nome,
    numero

  }).end();

});

//PUT
roteador.put('/cidadaos/id:', async (req, res) => {

    const{id} = req.params;
    
    console.log(isNaN(id), typeof(id));
    console.log(typeog(Number(id)), console.log(Number(id)));

    const{nome,numero} = req.body;

    console.log(id);

    console.table(req.body.nome, numero);

    try {
        if(!nome){
            throw new Error("nome está indefinido");            
        }
        res.status(200).json({mensagem:"usuario alterado"}).end();
    } catch (error) {
        res.status(400).json({erro: error.message}).end();
    }

});

//DELETE
roteador.delete("/cidadaos/:id", async (req, res) => {

    const id = req.params.id;

    const listaIds = id.split(",").map(id => id.trim());

    console.log(listaIds);
    res,status(204).end();

});


export default roteador;

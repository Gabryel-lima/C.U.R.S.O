import express from 'express';

const roteador = express.Router();

roteador.get("/cidadao", async(req, res) => {
    try{
      res.status(200).json({cidadao:"Dados Cidadao"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao consulta o Cidadao"}).end()
    }

})

export default roteador;
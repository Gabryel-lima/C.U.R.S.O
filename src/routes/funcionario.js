import express from 'express';

const roteador = express.Router();

roteador.get("/funcionario", async(req, res) => {
    try{
      res.status(200).json({funcionario:"Dados Funcionario"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao consulta o Funcionario"}).end()
    }

})

export default roteador;

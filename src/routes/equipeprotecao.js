import express from 'express';

const roteador = express.Router();

roteador.get('/equipeprotecao', async(req, res) => {
    try{
        res.status(200).json({equipeprotecao:"Dados da Equipe de Protecao"}).end()
    }catch(error){
        res.status(400).json({error:"Error ao consultar Equipe de Protecao"}).end()
    }

})

export default roteador;
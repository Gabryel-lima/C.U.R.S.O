import express from 'express';

const roteador = express.Router();

roteador.get("/cuidadores", async(req, res) => {
    try{
        res.status(200).json({cuidadores:"Dados Cuidadores"}).end()
    }catch(error){
        res.status(400).json({error: "Error ao consultar Cuidadores"}).end()
    }

})

export default roteador;

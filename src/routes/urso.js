import express from 'express';

const roteador = express.Router();

roteador.get("/ursos", async(req, res) => {
    try{
    res.status(200).json({urso:"Dados Urso"}).end()
    }catch(error){
    res.status(400).json({error: "Error ao consultar Urso"}).end()
    }

})
export default roteador;
import express from 'express';

const roteador = express.Router():

roteador.get('/guia', async(req, res) => {
    try{
        res.status(200).json({guia:"Dados do Guia"}).end()

    }catch(error){
        res.status(400).json({error:"Error ao consultar Guia"}).end()
    }

})

export default roteador;
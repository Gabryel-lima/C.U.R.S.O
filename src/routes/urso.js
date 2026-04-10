import express from 'express';

/** Roteador para o recurso Urso
 *  @author ana daniel
 *  @date 2026-04-09
 *  @file urso.js
 *  @description Define as rotas relacionadas ao recurso Urso.
 */
const roteador = express.Router();

roteador.get("/ursos", async(req, res) => {
    try{
    res.status(200).json({urso:"Dados Urso"}).end()
    }catch(error){
    res.status(400).json({error: "Error ao consultar Urso"}).end()
    }
})

export default roteador;

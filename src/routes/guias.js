import express from 'express';

/** Roteador para as rotas de guia
 *  @author VthugodoNL
 *  @date 2026-04-09
 *  @file guia.js
 *  @description Define as rotas relacionadas aos guias.
 */
const roteador = express.Router();

roteador.get('/guia', async(req, res) => {
    try{ 
        res.status(200).json({guia: "Dados do Guia"}).end()
    }catch(error){
        res.status(400).json({error: "Error ao consultar Guia"}).end()
    }
})

// Exemplo de uso:
// const guia = new Guia({ nome: 'Guia A', especialidade: 'Especialidade X' });
// guia.validate();
// console.log(guia.toJSON());

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

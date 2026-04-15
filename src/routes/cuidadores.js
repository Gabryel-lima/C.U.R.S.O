import express from 'express';

/** Roteador para as rotas de cuidadores
 *  @author ana daniel
 *  @date 2026-04-01
 *  @file cuidadores.js
 *  @description Define as rotas relacionadas aos cuidadores.
 */
const roteador = express.Router();

roteador.get("/cuidadores", async(req, res) => {
    try{ 
        res.status(200).json({cuidadores: "Dados Cuidadores"}).end()
    }catch(error){
        res.status(400).json({error: "Error ao consultar Cuidadores"}).end()
    }
})

/** Exemplo de uso:
 *  const cuidador = new Cuidador({ nome: 'Ana Daniel', email: 'ana@exemplo.com' });
 *  cuidador.validate();
 *  console.log(cuidador.toJSON());
 */

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

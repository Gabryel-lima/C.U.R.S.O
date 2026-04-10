import express from 'express';

/** Roteador para as rotas de cuidadores
 *  @author SXLOH
 *  @date 2026-04-09
 *  @file atendentes.js
 *  @description Define as rotas relacionadas aos atendentes.
 */
const roteador = express.Router();

roteador.get("/atendentes", async(req, res) => {
    try{ 
        res.status(200).json({atendentes: "Dados Atendentes"}).end()
    }catch(error){
        res.status(400).json({error: "Error ao consultar Atendentes"}).end()
    }
})

/** Exemplo de uso:
 *  const atendente = new Atendente({ nome: 'SXLOH', email: 'sxloh@exemplo.com' });
 *  atendente.validate();
 *  console.log(atendente.toJSON());
 */

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

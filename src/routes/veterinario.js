import express from 'express'; 

/** Roteador para as rotas de veterinários
 *  @author ana daniel
 *  @date 2026-04-09
 *  @file veterinario.js
 *  @description Define as rotas relacionadas aos veterinários.
 */
const roteador = express.Router();

roteador.get("/veterinario", async (req, res) =>{
    try{
        res.status(200).json({veterinario: "Dados veterinario"}).end()
    }catch(error){
        res.status(400).json({error: "Erro ao consultar dados do veterinario"}).end()
    }
})

/** Exemplo de uso:
 *  const veterinario = new Veterinario({ nome: 'Dr. Carlos', email: 'carlos@example.com' });
 *  await veterinario.salvar();
 */

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador; 

import express from 'express';
import atendente from '../models/atendente.mjs';

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
        res.status(400).json({error: "Erro ao consultar Atendentes"}).end()
    }
})

/** Exemplo de uso:
 *  const atendente = new Atendente({ nome: 'Sônia', email: 'sonia@exemplo.com' });
 *  atendente.validate();
 *  console.log(atendente.toJSON());
 */

roteador.get("/atendentes/:id", async(req, res) => {
    const idAtendente = req.params.id;
    
    try{
        const atendente = await atendentePeloId(idAtendente);

        res.status(200).json({atendente}).end()
    }catch(error){
        res.status(400).json({error: "Erro ao consultar atendente"}).end()
    }
})

roteador.post("/atendentes", async(req,res) => {
    const {nome, numero, endereco} = req.body;
    try{
        res.status(201).json({
            endereco,
            nome,
            numero
        }).end()}catch(error){
            res.status(400).json({error: "Erro ao cadastrar novo atendente"})
        }
})

roteador.delete("/atendentes/:id", async(req,res) => {
    const id = req.params.id;
    try{
        res.status(204).end()}catch(error){
            res.status(400).json({error:"Erro ao deletar atendente"}).end()
        }
})

roteador.put("/atendentes/:id", async(req,res) => {
    const {id} = req.params;
    const {
        endereco,
        nome,
        numero
    } = req.body;
    try{
        res.status(204).end();
    }catch(error){
        res.status(400).json({error: error.message}).end
    }
})
// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

import express from 'express';

/** Roteador para as rotas de visita
 *  @author Gabryel-lima
 *  @date 2026-04-09
 *  @file visita.js
 *  @description Define as rotas relacionadas às visitas.
 */
const roteador = express.Router();

roteador.get("/visitas", async(req, res) => {
    try{
      res.status(200).json({visita: "Dados Visita"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao consulta a Visita"}).end()
    }
})

roteador.put("/visitas/:id", async(req, res) => {
    try{
      res.status(200).json({visita: "Dados Visita Atualizada"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao atualizar a Visita"}).end()
    }
})

roteador.delete("/visitas/:id", async(req, res) => {
    try{
      res.status(200).json({visita: "Visita Excluida"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao excluir a Visita"}).end()
    }
})

roteador.post("/visitas", async(req, res) => {
    try{
      res.status(200).json({visita: "Visita Criada"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao criar a Visita"}).end()
    }
})

/** Exemplo de uso:
 *  const visita = new Visita({ nome: 'Ana', numero: '123456789' });
 *  visita.validate();
 *  console.log(visita.toJSON());
 */

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

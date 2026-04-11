import express from 'express';

/** Roteador para as rotas de funcionario
 *  @author Gabryel-lima
 *  @date 2026-04-01
 *  @file funcionario.js
 *  @description Define as rotas relacionadas aos funcionarios.
 */
const roteador = express.Router();

roteador.get("/funcionario", async(req, res) => {
    try{ 
      res.status(200).json({funcionario: "Dados Funcionario"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao consultar o Funcionario"}).end()
    }
})

roteador.put("/funcionario/:id", async(req, res) => {
    try{ 
      res.status(200).json({funcionario: "Dados Funcionario Atualizado"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao atualizar o Funcionario"}).end()
    }
})

roteador.delete("/funcionario/:id", async(req, res) => {
    try{ 
      res.status(200).json({funcionario: "Funcionario Excluido"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao excluir o Funcionario"}).end()
    }
})

roteador.post("/funcionario", async(req, res) => {
    try{ 
      res.status(200).json({funcionario: "Funcionario Criado"}).end()
    }catch(error){
      res.status(400).json({error: "Error ao criar o Funcionario"}).end()
    }
})

/** Exemplo de uso:
 *  const funcionario = new Funcionario({ nome: 'João Silva', email: 'joao@exemplo.com' });
 *  funcionario.validate();
 *  console.log(funcionario.toJSON());
 */

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

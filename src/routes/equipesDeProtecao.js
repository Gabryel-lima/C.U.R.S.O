import express from 'express';

/** Roteador para a equipe de proteção 
 *  @author VthugodoNL
 *  @date 2026-04-09
 *  @file equipeprotecao.js
 *  @description Define as rotas relacionadas à equipe de proteção.
*/

const roteador = express.Router();

// GET DA EQUIPE PROTECAO
roteador.get('/equipesprotecao', async(req, res) => {
    try{
        res.status(200).json({equipeprotecao: "Dados da Equipe de Protecao"}).end()
    }catch(error){
        res.status(400).json({error: "Error ao consultar Equipe de Protecao"}).end()
    }
})

// POST DA EQUIPE PROTECAO
roteador.post("/veterinarios/", async (req,res) => {
    const{nome, registro} = req.body;
    console.log(nome);
    res.status(201).json([
        nome,
        registro

    ]).end();
});

//PUT DA EQUIPE PROTECAO

roteador.put("/veterinarios/:id", async(req, res) => {
    
    const{id} = req.params;
    
    console.log(isNaN(id), typeof(id));
    
    console.log(typeof(Number(id)), console.log(Number(id)));
    
    const{nome,registro} = req.body;

    console.log(id);

    console.table(req.body.nome, registro);

    try {
        if(!nome){
            throw new Error("nome está indefinido");            
        }
        res.status(200).json({mensagem:"usuario alterado"}).end();
    } catch (error) {
        res.status(400).json({erro: error.message}).end();
    }

});

//DELETE DA EQUIPE PROTECAO

roteador.delete("/veterinarios/:id", async(req, res) => {

    const{id} = req.params;

    const listaIds = id.split("-").map(id => id.trim());

    console.log(listaIds);
    res.status(204).end();
});

// Exemplo de uso:
// const equipeprotecao = new EquipeProtecao({ nome: 'Equipe A', membros: ['João', 'Maria'] });
// equipeprotecao.validate();
// console.log(equipeprotecao.toJSON());

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

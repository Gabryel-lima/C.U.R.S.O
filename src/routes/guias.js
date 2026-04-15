import express from 'express';

/** Roteador para as rotas de guia
 *  @author VthugodoNL
 *  @date 2026-04-09
 *  @file guia.js
 *  @description Define as rotas relacionadas aos guias.
 */

//GET 
const roteador = express.Router();

roteador.get('/guia', async(req, res) => {
    try{ 
        res.status(200).json({guia: "Dados do Guia"}).end()
    }catch(error){
        res.status(400).json({error: "Error ao consultar Guia"}).end()
    }
})


//POST
roteador.post('/guia/', async (req, res) => {

    const{nome,registro} = req.body;

    console.log(nome);

    res.status(201).json({
        nome,
        registro
    }).end();
});

//PUT
roteador.put('/guia/id:', async (req, res) => {

    const{id} = req.params;
    
    console.log(isNaN(id), typeof(id));
    console.log(typeog(Number(id)), console.log(Number(id)));

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

//DELETE
roteador.delete("/guia/:id", async (req, res) => {

    const id = req.params.id;

    const listaIds = id.split(",").map(id => id.trim());

    console.log(listaIds);
    res,status(204).end();

});
// Exemplo de uso:
// const guia = new Guia({ nome: 'Guia A', especialidade: 'Especialidade X' });
// guia.validate();
// console.log(guia.toJSON());

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default roteador;

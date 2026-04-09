import express from 'express'; 

roteador.get("/veterinario", async (req, res) =>{
    try{
        res.status(200), json({veterinario: "Dados veterinario"}).end()
    }catch(error){
        res.status(200), json({error: "Erro ao consultar dados do veterinario"}).end()
    }
})

export default roteador; 


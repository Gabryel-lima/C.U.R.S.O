import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cidadaoRota from './src/routes/cidadao.js';
import equipeptcRota from './src/routes/equipeptc.js';

config();


const api = express();

const port = process.env.API_PORT;

api.use(bodyParser.json()); 

api.use(cidadaoRota);

api.use(equipeptcRota);

api.get("/teste", async(req, res) => {
    res.status(200).json({Resposta:"Rota de teste implementada"}).end()
})

api.listen(port, () => (
    console.log("API_ONLINE")
))
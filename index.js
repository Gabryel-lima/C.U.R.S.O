import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

// Importa as rotas dos módulos
import cidadaoRota from './src/routes/cidadao.js';
import cuidadoresRota from './src/routes/cuidadores.js';
import veterinarioRota from './src/routes/veterinario.js';
import equipeprotecaoRota from './src/routes/equipeprotecao.js';
import guiaRota from './src/routes/guia.js';

// Carrega as variáveis de ambiente do arquivo .env
config();

/** Configuração da API
 *  @author VthugodoNL
 *  @date 2026-04-08
 *  @file index.js
 *  @description Configura e inicializa a API Express.
 */
const api = express();

/** Configuração da porta da API
 *  @description Define a porta em que a API irá escutar.
 */
const port = process.env.API_PORT;

// Configura o middleware para parsear JSON nas requisições
api.use(bodyParser.json()); 

// Configura as rotas da API
api.use(cidadaoRota);
api.use(cuidadoresRota);
api.use(veterinarioRota);
api.use(equipeprotecaoRota);
api.use(guiaRota);

// Rota de teste para verificar se a API está funcionando
api.get("/teste", async(req, res) => {
    res.status(200).json({Resposta:"Rota de teste implementada"}).end()
})

// Inicia a API e escuta na porta definida
api.listen(port, () => (
    console.log("API_ONLINE")
))

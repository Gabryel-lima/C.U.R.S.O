import mysql from "mysql2/promise";
import {config } from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
config();

/** Configuração do banco de dados MySQL 
 *  @author VthugodoNL
 *  @date 2026-04-08
 *  @file dbConfig.mjs
 *  @description Configura a conexão com o banco de dados MySQL usando 
 *  variáveis de ambiente para as credenciais e parâmetros de conexão.
 *  @returns {Object} Objeto de configuração do pool de conexões do MySQL
*/
const dbConfig ={
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0,

};

/** Exporta o pool de conexões do MySQL para ser utilizado em outras partes da aplicação.
 *  @author VthugodoNL
 *  @date 2026-04-08
 *  @file dbConfig.mjs
 *  @description Cria e exporta um pool de conexões do MySQL usando a configuração definida.
 *  @returns {Pool} Pool de conexões do MySQL
*/
export const dbConnectionPool = mysql.createPool(dbConfig);

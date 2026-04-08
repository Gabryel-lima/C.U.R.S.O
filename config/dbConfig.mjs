import mysql from "mysql2/promise";
import {config } from "dotenv";

config();

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

export const dbConnectionPool = mysql.createPool(dbConfig);
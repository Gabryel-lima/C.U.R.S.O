import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

/** Inicializa o banco de dados SQLite.
 * @author Gabriel Lima
 * @date 2026-04-01
 * @file initDb.js
 * @description Lê o arquivo SQL de inicialização e executa as instruções para criar as tabelas e inserir dados iniciais.
 * @param {Object} options - Opções de configuração
 * @param {string} options.filename - Caminho para o arquivo do banco de dados
 * @param {string} options.sqlFile - Caminho para o arquivo SQL de inicialização
 * @returns {Promise<sqlite3.Database>} Promise que resolve com a instância do banco de dados
 */
function initDb(options = {}) {
  const dbFile = options.filename || path.join(__dirname, '../../db/dev.sqlite');
  const sqlFile = options.sqlFile || path.join(__dirname, '../../db/scripts.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFile, (err) => {
      if (err) return reject(err);
      db.exec(sql, (err2) => {
        if (err2) return reject(err2);
        resolve(db);
      });
    });
  });
}

/** Exemplo de uso 
 *  initDb()
 *    .then(db => {
 *      console.log('Banco de dados inicializado com sucesso');
 *      db.close();
 *    })
 *    .catch(err => {
 *      console.error('Erro ao inicializar o banco de dados:', err);
 *    });
 */

// Exporta a função initDb para ser utilizada em outras partes da aplicação
export { initDb };

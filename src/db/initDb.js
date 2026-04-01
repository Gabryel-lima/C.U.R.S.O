const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

/** Inicializa o banco de dados SQLite.
 * @author Gabriel Lima
 * @date 2024-06-01
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

module.exports = { initDb };

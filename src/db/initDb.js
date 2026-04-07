const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

/** Tabelas esperadas no schema atual */
const EXPECTED_TABLES = [
  'atendente',
  'cidadao',
  'cuidador',
  'diagnostico',
  'emergencia',
  'guia',
  'ocorrencia',
  'urso',
  'veterinario'
];

/** Executa uma instrução SQL no banco de dados.
 * @param {sqlite3.Database} db - Instância do banco de dados
 * @param {string} sql - Instrução SQL a ser executada
 * @returns {Promise<void>} Promise que resolve quando a instrução é executada
 */
function execSql(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

/** Lista as tabelas de usuário no banco de dados.
 * @param {sqlite3.Database} db - Instância do banco de dados
 * @returns {Promise<string[]>} Promise que resolve com os nomes das tabelas
 */
function listUserTables(db) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
      (error, rows) => {
        if (error) return reject(error);
        resolve(rows.map((row) => row.name));
      }
    );
  });
}

/** Verifica se o schema do banco de dados deve ser inicializado ou recriado.
 * @param {string[]} tables - Lista de tabelas existentes no banco
 * @param {boolean} forceReset - Indica se a recriação do schema deve ser forçada
 * @returns {boolean} True se o schema deve ser inicializado ou recriado
 */
function shouldBootstrapSchema(tables, forceReset) {
  if (forceReset) return true;
  if (tables.length === 0) return true;

  const hasLegacyFuncionarioTable = tables.includes('funcionario');
  const hasCurrentSchemaTable = EXPECTED_TABLES.some((table) => tables.includes(table));

  return hasLegacyFuncionarioTable && !hasCurrentSchemaTable;
}

/** Inicializa o banco de dados SQLite.
 * @author Gabriel Lima
 * @date 2026-04-27
 * @file initDb.js
 * @description Lê o arquivo SQL de inicialização e executa as instruções para criar as tabelas e inserir dados iniciais.
 * @param {Object} options - Opções de configuração
 * @param {string} options.filename - Caminho para o arquivo do banco de dados
 * @param {string} options.sqlFile - Caminho para o arquivo SQL de inicialização
 * @param {boolean} options.forceReset - Força recriação completa do schema
 * @returns {Promise<sqlite3.Database>} Promise que resolve com a instância do banco de dados
 */
function initDb(options = {}) {
  const dbFile = options.filename || path.join(__dirname, '../../db/dev.sqlite');
  const sqlFile = options.sqlFile || path.join(__dirname, '../../db/scripts.sql');
  const forceReset = options.forceReset === true;
  const sql = fs.readFileSync(sqlFile, 'utf8');

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFile, (err) => {
      if (err) return reject(err);

      (async () => {
        try {
          await execSql(db, 'PRAGMA foreign_keys = ON;');
          const tables = await listUserTables(db);

          if (shouldBootstrapSchema(tables, forceReset)) {
            await execSql(db, sql);
            await execSql(db, 'PRAGMA foreign_keys = ON;');
          }

          resolve(db);
        } catch (error) {
          db.close(() => reject(error));
        }
      })();
    });
  });
}

module.exports = { initDb };

if (require.main === module) {
  const forceReset = process.argv.includes('--force');

  initDb({ forceReset })
    .then((db) => {
      console.log(forceReset ? 'Banco recriado com sucesso.' : 'Banco inicializado com sucesso.');
      db.close();
    })
    .catch((error) => {
      console.error('Erro inicializando o banco:', error);
      process.exit(1);
    });
}

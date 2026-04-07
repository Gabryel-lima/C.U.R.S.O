/** Executa uma consulta SQL e retorna todas as linhas.
 * @param {sqlite3.Database} db - Instância do banco de dados
 * @param {string} sql - Instrução SQL a ser executada
 * @param {Array} params - Parâmetros para a consulta SQL
 * @returns {Promise<Array>} Promise que resolve com as linhas retornadas
 */
function allRows(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
}

/** Executa uma consulta SQL e retorna a primeira linha.
 * @param {sqlite3.Database} db - Instância do banco de dados
 * @param {string} sql - Instrução SQL a ser executada
 * @param {Array} params - Parâmetros para a consulta SQL
 * @returns {Promise<Object|null>} Promise que resolve com a primeira linha ou null
 */
function getRow(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) return reject(error);
      resolve(row || null);
    });
  });
}

/** Executa uma instrução SQL e retorna informações sobre a execução.
 * @param {sqlite3.Database} db - Instância do banco de dados
 * @param {string} sql - Instrução SQL a ser executada
 * @param {Array} params - Parâmetros para a instrução SQL
 * @returns {Promise<Object>} Promise que resolve com informações sobre a execução
 */
function runStatement(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) return reject(error);
      resolve({ changes: this.changes, lastID: this.lastID });
    });
  });
}

module.exports = {
  allRows,
  getRow,
  runStatement
};

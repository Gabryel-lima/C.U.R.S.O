const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

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

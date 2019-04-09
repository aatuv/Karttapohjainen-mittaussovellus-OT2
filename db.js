const sql = require('mssql');

const dbConfig = {
    user: 'asd',
    password: 'Ohjelmistotuotanto2',
    server: 'ot2.database.windows.net',
    database: 'OTI22',
    encrypt: true
}

const pool = new sql.ConnectionPool(dbConfig).connect(err => {
    if (err) {
        console.log(err);
    }
});
const request = new sql.Request(pool);

module.exports = { pool, sql, request };
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'data-node',
    password: 'fcporto'
});

module.exports = pool.promise();



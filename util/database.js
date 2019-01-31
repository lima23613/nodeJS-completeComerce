const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'nodejs_sitetest',
    password: 'root'
});

module.exports = pool.promise();



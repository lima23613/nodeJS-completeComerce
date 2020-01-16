/* const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'data-node',
    password: 'fcporto'
});

module.exports = pool.promise(); */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('data-Node','root','fcporto',{dialect: 'mysql',host:'localhost'});

module.exports = sequelize;
const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
  host: config.DB.host,
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();
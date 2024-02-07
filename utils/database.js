const mysql = require('mysql2');
const { promisify } = require('util');
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bots',
});
const query = promisify(conn.query).bind(conn);

module.exports = { query, conn };
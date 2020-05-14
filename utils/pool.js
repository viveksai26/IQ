'use strict';

const mysql = require('promise-mysql');

const pool = await mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  database: 'rnapp',
});


module.exports = pool;
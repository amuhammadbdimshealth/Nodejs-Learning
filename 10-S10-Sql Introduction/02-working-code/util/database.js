const mysql = require('mysql2');
const pool = mysql.createPool({    
  host: 'localhost',
  user: 'root',
  database: '10-node-complete',
  password: '8352739'
})

module.exports = pool.promise()
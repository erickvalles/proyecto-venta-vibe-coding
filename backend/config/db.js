const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'COOK_VALLES',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection()
  .then(conn => {
    console.log('Conexión a MySQL exitosa')
    conn.release()
  })
  .catch(err => {
    console.error('Error conectando a MySQL:', err.message)
  })

module.exports = pool
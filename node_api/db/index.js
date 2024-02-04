// 数据库  连接池

const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
  host: '******',
  port:3213,
  user: '***',
  password: '*****',
  database: '****',
  connectionLimit: 20
})

// 导出数据库连接对象
module.exports = pool;

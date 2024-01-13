// 数据库  连接池

const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
  host: 'cd-cdb-k1lpjubm.sql.tencentcdb.com',
  port:63983,
  user: 'root',
  password: 'Hejunhao01',
  database: 'tiaozao',
  connectionLimit: 20
})

// 导出数据库连接对象
module.exports = pool;
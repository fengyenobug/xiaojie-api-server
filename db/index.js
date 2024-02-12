import mysql from 'mysql'
const db = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'xiaojieapi'
})

export default db
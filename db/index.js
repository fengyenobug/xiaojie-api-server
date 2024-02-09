import mysql from 'mysql'

const db = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'wjj162017.',
    database: 'xiaojieapi'
})

export default db
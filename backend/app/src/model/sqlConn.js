import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Create MySQL pool
const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    connectionLimit: process.env.SQL_CONN_LIMIT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
    charset: 'utf8mb4',
    multipleStatements: true,
    port: process.env.SQL_PORT,
    timezone: 'utc'
})

// Attempt to catch disconnects 
pool.on('connection', connection => {
    console.log('DB Connection established')
    connection.on('error', err => console.error(new Date(), 'MySQL error', err.code))
    connection.on('close', err => console.error(new Date(), 'MySQL close', err))
})

export default pool

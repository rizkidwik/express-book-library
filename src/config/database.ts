import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'myapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
export const pool = mysql.createPool(dbConfig);

let connection: mysql.Connection

export const connectDB = async () => {
    try {
        connection = await mysql.createConnection(dbConfig)
        console.log('Mysql connected')
        return connection
    } catch (error) {
        console.error('Mysql Error : ', error)
        process.exit(1)
    }
}

export const disconnectDB = async () => {
    try {
        if(connection){
            await connection.end()
            console.log('Mysql Disconnected')
        }
    } catch (error) {
        console.error('Error disconnection mysql', error)
    }
}

export const getConnection = () => connection
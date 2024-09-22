import pg from 'pg'
import { config } from '@config/index'
const { Client } = pg

export class Database {
  static getConnection = async() => {
    const db = new Client({
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_NAME,
    })
    await db.connect()
    return db
  }
}
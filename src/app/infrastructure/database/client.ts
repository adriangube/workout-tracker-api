import pg from 'pg'
import { config } from '@/app/config/index'
const { Client } = pg

export class Database {
  static getConnection = async() => {
    const db = new Client({
      connectionString: config.DB_URL
    })
    await db.connect()
    return db
  }
}
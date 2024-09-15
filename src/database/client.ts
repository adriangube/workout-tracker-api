import pg from 'pg'
const { Client } = pg;

export class Database {
  static getConnection = async() => {
    const db = new Client({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      database: process.env.POSTGRES_DB,
    })
    await db.connect()
    return db
  }
}
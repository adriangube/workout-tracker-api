export const config = {
  PORT: process.env.PORT ?? 3000,
  DB_USER: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.POSTGRES_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT as unknown as  number ?? 5432,
  DB_NAME: process.env.POSTGRES_DB,
  SALT_ROUNDS: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
  SECRET: process.env.SECRET,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME
}
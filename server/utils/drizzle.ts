import { drizzle } from "drizzle-orm/node-postgres";
export { sql, eq, and, or } from 'drizzle-orm'
import * as schema from '../database/schema'
export const tables = schema

import { Pool } from 'pg'

// Создаем пул соединений с базой данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Используем DATABASE_URL из .env
  ssl: {
    rejectUnauthorized: false, // Для Neon обычно требуется это
  },
});

export function useDrizzle() {
  return drizzle(pool, { schema })
}

export type User = typeof schema.users.$inferSelect

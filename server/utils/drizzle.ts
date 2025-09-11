import { drizzle } from "drizzle-orm/postgres-js";
export { sql, eq, and, or } from 'drizzle-orm'
import * as schema from '~~/server/database/schema';
import postgres from 'postgres';

export const tables = schema;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}
const queryClient = postgres(process.env.DATABASE_URL);

export function useDrizzle() {
  return drizzle(queryClient, { schema })
}

export type User = typeof schema.users.$inferSelect

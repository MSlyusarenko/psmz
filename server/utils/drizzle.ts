import { drizzle } from "drizzle-orm/postgres-js";
export { sql, eq, and, or } from 'drizzle-orm'
import * as schema from '../database/schema';
import postgres from 'postgres';

export const tables = schema;

const queryClient = postgres(process.env.DATABASE_URL);

export function useDrizzle() {
  return drizzle(queryClient, { schema })
}

export type User = typeof schema.users.$inferSelect

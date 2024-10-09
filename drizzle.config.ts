import { defineConfig } from 'drizzle-kit'
import "dotenv/config";

export default defineConfig({
  schema: './server/database/schema.ts',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
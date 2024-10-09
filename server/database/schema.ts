import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  vk_id: text('vk_id'),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  role: text('role'),
  avatar: text('avatar').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

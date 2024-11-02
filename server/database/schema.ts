// ~sever/database/schema.ts
import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  vk_id: text('vk_id'),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  nickname: text('nickname').notNull(),
  role: text('role'),
  avatar: text('avatar').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  city: text('city'),
  donate: integer('donate').default(0),
  position_psmz: text('position_psmz'), // Новое поле для должности в ПСМЗ
  position_mz: text('position_mz'),     // Новое поле для должности в МЗ
  rank: text('rank'),                   // Новое поле для ранга
  bank: text('bank'),                   // Новое поле для банка
});

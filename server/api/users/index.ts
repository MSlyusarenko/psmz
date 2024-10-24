import { defineEventHandler } from 'h3';
import { useDrizzle, eq } from '~/server/utils/drizzle';
import { tables } from '~/server/utils/drizzle';

export default defineEventHandler(async (event) => {
  const db = useDrizzle();

  try {
    const users = await db
      .select({
        id: tables.users.id,
        first_name: tables.users.first_name,
        last_name: tables.users.last_name,
        nickname: tables.users.nickname,
        avatar: tables.users.avatar,
        city: tables.users.city,
        role: tables.users.role,
        createdAt: tables.users.createdAt,
        donate: tables.users.donate,
        position_psmz: tables.users.position_psmz, // Новое поле
        position_mz: tables.users.position_mz,     // Новое поле
        rank: tables.users.rank,                     // Новое поле
        bank: tables.users.bank,                     // Новое поле
      })
      .from(tables.users);

    return users;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    return { error: 'Не удалось загрузить пользователей' };
  }
});

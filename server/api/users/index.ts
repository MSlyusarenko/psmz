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
      })
      .from(tables.users);

    return users;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    return { error: 'Не удалось загрузить пользователей' };
  }
});

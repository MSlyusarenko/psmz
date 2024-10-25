import { getUserSession } from '~/server/utils/session';
import { useDrizzle, eq } from '~/server/utils/drizzle';
import { tables } from '~/server/utils/drizzle';

export default defineEventHandler(async (event) => {
  const userSession = getUserSession(event);

  if (!userSession) {
    return { error: 'ТЫ НЕ АВТОРИЗОВАН' };
  }

  const db = useDrizzle();

  const user = await db
    .select({
      id: tables.users.id,
      vk_id: tables.users.vk_id,
      first_name: tables.users.first_name,
      last_name: tables.users.last_name,
      avatar: tables.users.avatar,
      city: tables.users.city,
      createdAt: tables.users.createdAt,
      nickname: tables.users.nickname,
      donate: tables.users.donate,
      position_psmz: tables.users.position_psmz, // Новое поле
      position_mz: tables.users.position_mz,     // Новое поле
      rank: tables.users.rank,                   // Новое поле
      bank: tables.users.bank,                   // Новое поле
      role: tables.users.role,                   // Новое поле
    })
    .from(tables.users)
    .where(eq(tables.users.id, userSession.id))
    .limit(1);



  if (user.length === 0) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' });
  }

  return user[0];

});
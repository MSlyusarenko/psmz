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
    })
    .from(tables.users)
    .where(eq(tables.users.id, userSession.id))
    .limit(1);



  if (user.length === 0) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' });
  }

  console.log('Возвращаемые данные пользователя:', user);
  console.log('User Session:', userSession);
  console.log('User Session ID:', userSession.id);
  return user[0];

});

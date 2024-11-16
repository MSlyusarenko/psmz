import { getUserSession } from '~/server/utils/session';
import { useDrizzle, eq } from '~/server/utils/drizzle';
import { tables } from '~/server/utils/drizzle';

interface User {
  id: number;
  vk_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  city: string;
  createdAt: Date;
  nickname: string;
  donate: number;
  position_psmz: string;
  position_mz: string;
  rank: string;
  bank: string;
  role: string;
}

interface UserSession {
  id: number;
}

export default defineEventHandler(async (event) => {
  const userSession: UserSession | null = getUserSession(event);

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
      position_psmz: tables.users.position_psmz,
      position_mz: tables.users.position_mz,
      rank: tables.users.rank,
      bank: tables.users.bank,
      role: tables.users.role,
    })
    .from(tables.users)
    .where(eq(tables.users.id, userSession.id))
    .limit(1);

  if (!user || user.length === 0) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' });
  }

  return user[0];
});

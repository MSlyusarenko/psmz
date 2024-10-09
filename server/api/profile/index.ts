import { getUserSession } from '~/server/utils/session'
import { useDrizzle, eq } from '~/server/utils/drizzle'
import { tables } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  const userSession = getUserSession(event)

  if (!userSession) {
    return { error: 'ТЫ НЕ АВТОРИЗОВАН' }
  }

  const db = useDrizzle()

  // Запрос данных пользователя по id
  const user = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.id, userSession.id))
    .limit(1)

  if (user.length === 0) {
    throw createError({ statusCode: 404, message: 'Пользователь не найден' })
  }

  return user[0]
})

// server/api/session/check.ts
import { defineEventHandler } from 'h3';
import { getUserSession } from '~/server/utils/session';

export default defineEventHandler((event) => {
  const userSession = getUserSession(event);

  // Возвращаем данные сессии или пустой объект
  if (userSession) {
    return { session: userSession };
  }

  // Возвращаем null, если сессии нет
  return { session: null };
});

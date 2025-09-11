// server/api/auth/logout.ts
import { defineEventHandler } from 'h3';
import { deleteUserSession } from '~~/server/utils/session'; // Импортируй свою функцию для удаления сессии

export default defineEventHandler((event) => {
  // Удаляем сессию пользователя
  deleteUserSession(event); 
  return { message: 'Successfully logged out' }; // Возвращаем сообщение об успешном выходе
});

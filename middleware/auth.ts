// server/middleware/auth.ts
import { defineEventHandler, sendRedirect } from 'h3';
import { getUserSession } from '~/server/utils/session';

export default defineEventHandler((event) => {
    const userSession = getUserSession(event);

    // Если пользователь не авторизован, перенаправляем его на главную страницу
    if (!userSession) {
        sendRedirect(event, '/'); // или на другую страницу, если нужно
    }
});

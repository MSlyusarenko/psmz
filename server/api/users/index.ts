import { defineEventHandler, useQuery } from 'h3';
import { db } from '~/server/lib/db'; // Импортируйте вашу конфигурацию базы данных
import { users } from '~/server/database/schema'; // Импортируйте схему вашей таблицы

export default defineEventHandler(async (event) => {
    // Выполняем запрос к базе данных
    const allUsers = await db.select().from(users);

    // Возвращаем всех пользователей
    return allUsers;
});
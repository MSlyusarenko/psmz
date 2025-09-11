import { defineEventHandler } from 'h3';
import { useDrizzle, eq } from '~~/server/utils/drizzle';
import { tables } from '~~/server/utils/drizzle';

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const { id } = event.context.params; // Извлечение ID из параметров пути

    console.log('Полученный ID:', id); // Логируем ID для проверки

    if (!id || isNaN(Number(id))) {
        console.error('Некорректный ID');
        return { error: 'Некорректный ID пользователя' };
    }

    try {
        const users = await db
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
            .where(eq(tables.users.id, Number(id)))
            .limit(1);

        if (users.length === 0) {
            console.error('Пользователь не найден');
            return { error: 'Пользователь не найден' };
        }

        console.log('Загруженный пользователь из БД:', users[0]);
        return users[0];
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        return { error: 'Не удалось загрузить пользователя' };
    }
});

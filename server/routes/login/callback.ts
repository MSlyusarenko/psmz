import { defineEventHandler, sendRedirect } from 'h3';
import { useSafeValidatedQuery } from 'h3-zod';
import { object, z } from 'zod';
import { zh } from 'h3-zod';
import { eq } from 'drizzle-orm';
import { createSessionToken } from '~/server/utils/session';
import { users } from '~/server/database/schema';

const querySchema = z.object({
    code: z.string(),
    state: z.string(),
});

export default defineEventHandler(async (event) => {
    // Валидация параметров запроса
    const query = await zh.useSafeValidatedQuery(event, querySchema);
    if (query.error) return sendRedirect(event, '/'); // Если есть ошибка, редиректим на главную страницу

    try {
        // Получаем access_token
        const response = (await $fetch('https://oauth.vk.com/access_token?' + new URLSearchParams({
            client_id: process.env.VK_CLIENT_ID!,
            client_secret: process.env.VK_CLIENT_SECRET!,
            redirect_uri: new URL("/login/callback", process.env.VK_REDIRECT_URI).toString(),
            code: query.data.code,
            scope: 'photos wall', // Запрашиваем права photos и wall
        }).toString())) as { access_token: string, expires_in: number, user_id: number };

        if (!response.access_token) {
            throw new Error('Access token not found');
        }

        console.log('Ответ от VK API (публикация поста):', response.data);
        console.log('Access token:', response.access_token);

        const checkUserPermissions = async (userToken: string): Promise<number> => {
            const response = await $fetch('https://api.vk.com/method/account.getAppPermissions', {
              params: {
                access_token: userToken,
                v: '5.199',
              },
            });
          
            console.log('Полный ответ от account.getAppPermissions:', response); // Логируем полный ответ
          
            if (response.error) {
              throw new Error('Ошибка при проверке прав: ' + response.error.error_msg);
            }
          
            return response.response; // Возвращает битовую маску прав
          };

        // Проверяем права доступа
        const permissions = await checkUserPermissions(response.access_token);
        console.log('Прав:', permissions);

        // Получаем данные пользователя
        const userResponse = await $fetch('https://api.vk.com/method/users.get?v=5.199&fields=photo_max', {
            headers: { Authorization: `Bearer ${response.access_token}` },
        }) as { response: { id: number, first_name: string, last_name: string, photo_max: string }[] };

        if (!userResponse.response || userResponse.response.length === 0) {
            throw new Error('User data not found');
        }

        // Проверяем, есть ли пользователь в базе
        let user = await useDrizzle().query.users.findFirst({
            where: eq(users.vk_id, userResponse.response[0].id),
            columns: {
                id: true,
                first_name: true,
                last_name: true,
                avatar: true,
                createdAt: true,
                role: true,
                nickname: true,
                city: true,
                donate: true,
            },
        });

        // Если пользователь не найден, создаем нового
        // Если пользователь не найден, создаем нового
        if (!user) {
            user = (await useDrizzle().insert(users).values({
                first_name: userResponse.response[0].first_name,
                last_name: userResponse.response[0].last_name,
                avatar: userResponse.response[0].photo_max,
                vk_id: `${userResponse.response[0].id}`,
                nickname: "default_nickname",
                donate: 0,
            }).returning({
                id: users.id,
                first_name: users.first_name,
                last_name: users.last_name,
                avatar: users.avatar,
                createdAt: users.createdAt,
                donate: users.donate,
                position_psmz: users.position_psmz, // Новое поле
                position_mz: users.position_mz,     // Новое поле
                rank: users.rank,                   // Новое поле
                bank: users.bank,                   // Новое поле
                role: users.role,                   // Новое поле
            }))[0];
        }

        // Создаем токен сессии
        const token = createSessionToken({
            id: user!.id, // Используйте "!" только если уверены, что user не undefined
            vk_id: user!.vk_id,
            first_name: user!.first_name,
            last_name: user!.last_name,
            nickname: user!.nickname || "default_nickname",
            city: user!.city || "",
            avatar: user!.avatar,
            createdAt: user!.createdAt.toISOString(),
            donate: user!.donate || 0,
            role: user!.role || "user",
            userTokenSession: response.access_token
        });

        // Устанавливаем куку с токеном
        setCookie(event, "session.token", token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 дней 
        });

        sendRedirect(event, '/dash'); // Редиректим на панель управления
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        sendRedirect(event, '/'); // В случае ошибки редиректим на главную страницу
    }
});

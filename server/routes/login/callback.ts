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
        }).toString())) as { access_token: string, expires_in: number, user_id: number }; 

        if (!response.access_token) { 
            throw new Error('Access token not found'); 
        } 

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
            }, 
        }); 

        // Если пользователь не найден, создаем нового
        if (!user) { 
            user = (await useDrizzle().insert(users).values({ 
                first_name: userResponse.response[0].first_name, 
                last_name: userResponse.response[0].last_name, 
                avatar: userResponse.response[0].photo_max, 
                vk_id: `${userResponse.response[0].id}`, 
            }).returning({ 
                id: users.id, 
                first_name: users.first_name, 
                last_name: users.last_name, 
                avatar: users.avatar,
                createdAt: users.createdAt, 
            }))[0]; 
        } 

        // Создаем токен сессии
        const token = createSessionToken({ 
            id: user.id, 
            vk_id: user.vk_id, 
            first_name: user.first_name, 
            last_name: user.last_name, 
            avatar: user.avatar, 
            createdAt: user.createdAt.toISOString(), // Приводим к строке
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

import { defineEventHandler } from 'h3';
import { useSafeValidatedQuery } from 'h3-zod';
import { query } from '~/server/lib/db';
import { object, z } from 'zod';
import { zh } from 'h3-zod';
import { eq } from 'drizzle-orm';


const querySchema = z.object({
    code: z.string(),
    state: z.string(),
})


export default defineEventHandler(async (event) => {
    const query = await zh.useSafeValidatedQuery(event, querySchema)
    if (query.error) return sendRedirect(event, '/');

    // TODO: Добавить try/catch, security issue
    const response = (await $fetch('https://oauth.vk.com/access_token?' + new URLSearchParams({
        client_id: process.env.VK_CLIENT_ID!,
        client_secret: process.env.VK_CLIENT_SECRET!,
        redirect_uri: new URL("/login/callback", process.env.VK_REDIRECT_URI).toString(),
        code: query.data.code,
    }).toString())) as {access_token: string, expires_in: number, user_id: number}

    // TODO: Добавить try/catch, security issue
    const userResponse = await $fetch('https://api.vk.com/method/users.get?v=5.199&fields=photo_max', {
        headers:{Authorization: `Bearer ${response.access_token}`},
        params: {}
    }) as {response: {id: number, first_name: string, last_name: string, photo_max: string}[]}

    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.vk_id, userResponse.response[0].id),
        columns: {
            id: true,
            first_name: true,
            last_name: true,
            avatar: true
        }
    });
    if (!user) {
        user = (await useDrizzle().insert(tables.users).values({
            first_name: userResponse.response[0].first_name,
            last_name: userResponse.response[0].last_name,
            avatar: userResponse.response[0].photo_max,
            vk_id: `${userResponse.response[0].id}`
        }).returning({
            id: tables.users.id,
            first_name: tables.users.first_name,
            last_name: tables.users.last_name,
            avatar: tables.users.avatar
        }))[0]
    }

    const token = createSessionToken({
        id: user.id,
        fist_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar
    });

    setCookie(event, "session.token", token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 дней
    });

    sendRedirect(event, '/dash/profile');
});

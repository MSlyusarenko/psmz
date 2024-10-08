import { defineEventHandler } from 'h3';
import { useSafeValidatedQuery } from 'h3-zod';
import { query } from '~/server/lib/db';
import { object, z } from 'zod';
import { zh } from 'h3-zod';


const querySchema = z.object({
    code: z.string(),
    state: z.string(),
})


export default defineEventHandler(async (event) => {
    const query = await zh.useSafeValidatedQuery(event, querySchema)
    if (query.error) return sendRedirect(event, '/');
    const response = (await $fetch('https://oauth.vk.com/access_token?' + new URLSearchParams({
        client_id: process.env.VK_CLIENT_ID!,
        client_secret: process.env.VK_CLIENT_SECRET!,
        redirect_uri: new URL("/login/callback", process.env.VK_REDIRECT_URI).toString(),
        code: query.data.code,
    }).toString())) as {access_token: string, expires_in: number, user_id: number}
    console.log(response)
    const userResponse = await $fetch('https://api.vk.com/method/users.get?v=5.199&fields=photo_max', {
        headers:{Authorization: `Bearer ${response.access_token}`},
        params: {}
    });
    console.log(userResponse)
    useDrizzle().query.users.findFirst({where:eq(tables.users.vk_id, userResponse.response[0].id)})
});

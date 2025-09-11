import { defineEventHandler, sendRedirect, setCookie, getCookie } from 'h3';
import { useSafeValidatedQuery } from 'h3-zod';
import { object, z } from 'zod';
import { zh } from 'h3-zod';
import { eq } from 'drizzle-orm';
import { createSessionToken } from '~~/server/utils/session';
import { users } from '~~/server/database/schema';
import { useDrizzle } from '~~/server/utils/drizzle';

const querySchema = z.object({
  code: z.string().optional(),
  state: z.string().optional(),
  device_id: z.string().optional(),
  type: z.string().optional(),
  payload: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  console.log('Callback started. Query:', event.node.req.url); // Лог полного URL

  const query = await zh.useSafeValidatedQuery(event, querySchema);
  if (query.error) {
    console.error('Validation error:', query.error);
    return sendRedirect(event, '/?error=validation_failed');
  }

  let parsedPayload;
  // Обработка JSON payload или прямых params
  if (query.data.payload) {
    console.log('Parsing payload JSON');
    try {
      parsedPayload = JSON.parse(decodeURIComponent(query.data.payload));
    } catch (e) {
      console.error('Payload parse error:', e);
      return sendRedirect(event, '/?error=invalid_payload');
    }
  } else {
    // Fallback на прямые параметры (ваш случай)
    console.log('Using direct query params');
    parsedPayload = {
      code: query.data.code,
      state: query.data.state,
      type: query.data.type,
      device_id: query.data.device_id,
    };
  }

  console.log('Parsed payload:', parsedPayload);

  if (!parsedPayload.code || !parsedPayload.state || parsedPayload.type !== 'code_v2') {
    console.error('Invalid payload structure');
    return sendRedirect(event, '/?error=invalid_payload');
  }

  try {
    // Валидация state
    const savedState = getCookie(event, 'vk_state');
    console.log('Saved state:', savedState, 'Received:', parsedPayload.state);
    if (parsedPayload.state !== savedState) {
      console.error('State mismatch');
      throw new Error('State mismatch');
    }

    const verifier = getCookie(event, 'vk_verifier');
    if (!verifier) {
      console.error('Verifier not found');
      throw new Error('Verifier not found');
    }

    const redirectUri = new URL('/login/callback', process.env.VK_REDIRECT_URI || 'http://localhost:3000').toString();
    const deviceId = parsedPayload.device_id || '';

    console.log('Exchanging code for token...');

    // Обмен code на token (POST)
    const tokenResponse = await $fetch('https://id.vk.com/oauth2/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.VK_CLIENT_ID!,
        code: parsedPayload.code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
        device_id: deviceId,
      }),
    }) as { access_token: string; expires_in: number; refresh_token?: string; scope?: string };

    console.log('Token response:', { hasToken: !!tokenResponse.access_token, scopes: tokenResponse.scope });

    if (!tokenResponse.access_token) {
      console.error('Token not found');
      throw new Error('Token not found');
    }

    // Валидация scopes
    const requiredScopes = ['offline', 'video', 'photos', 'docs'];
    const grantedScopes = (tokenResponse.scope || '').split(' ');
    const missingScopes = requiredScopes.filter(s => !grantedScopes.includes(s));
    if (missingScopes.length > 0) {
      console.error('Missing scopes:', missingScopes);
      throw new Error(`Missing scopes: ${missingScopes.join(', ')}`);
    }

    // Получение данных пользователя
    const userResponse = await $fetch(`https://api.vk.com/method/users.get?access_token=${tokenResponse.access_token}&v=5.199&fields=photo_max`) as { response: { id: number; first_name: string; last_name: string; photo_max: string }[] };
    console.log('User response:', userResponse.response?.[0] ? 'Success' : 'Failed');

    if (!userResponse.response || userResponse.response.length === 0) {
      throw new Error('User data not found');
    }

    const userData = userResponse.response[0];

    // Проверка/создание пользователя в БД
    let user = await useDrizzle().query.users.findFirst({
      where: eq(users.vk_id, `${userData.id}`),
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

    console.log('User in DB:', user ? 'Found' : 'Creating new');

    if (!user) {
      user = (await useDrizzle().insert(users).values({
        first_name: userData.first_name,
        last_name: userData.last_name,
        avatar: userData.photo_max,
        vk_id: `${userData.id}`,
        nickname: "default_nickname",
        donate: 0,
        // Дефолты для новых полей
        position_psmz: 0,
        position_mz: 0,
        rank: 0,
        bank: 0,
        role: 'user',
      }).returning({
        id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        avatar: users.avatar,
        createdAt: users.createdAt,
        donate: users.donate,
        position_psmz: users.position_psmz,
        position_mz: users.position_mz,
        rank: users.rank,
        bank: users.bank,
        role: users.role,
      }))[0];
    }

    // Создание токена сессии
    const sessionToken = createSessionToken({
      id: user.id,
      vk_id: user.vk_id,
      first_name: user.first_name,
      last_name: user.last_name,
      nickname: user.nickname || "default_nickname",
      city: user.city || "",
      avatar: user.avatar,
      createdAt: user.createdAt.toISOString(),
      donate: user.donate || 0,
      role: user.role || "user",
      userTokenSession: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token || '',
    });

    // Установка куки сессии (secure условно для dev)
    const isProd = process.env.NODE_ENV === 'production';
    setCookie(event, "session.token", sessionToken, {
      httpOnly: true,
      secure: isProd,
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });

    console.log('Session cookie set, redirecting to /dash');

    // Очистка временных куки
    setCookie(event, 'vk_state', '', { maxAge: 0 });
    setCookie(event, 'vk_verifier', '', { maxAge: 0 });

    sendRedirect(event, '/dash');
  } catch (error) {
    console.error('Callback error:', error);
    sendRedirect(event, '/?error=' + encodeURIComponent(error.message));
  }
});
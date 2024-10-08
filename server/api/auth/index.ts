import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  const clientId = process.env.VK_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.VK_REDIRECT_URI!);

  const oauthParams = new URLSearchParams({
    client_id: process.env.VK_CLIENT_ID!,
    display: 'page',
    redirect_uri: new URL("/login/callback", process.env.VK_REDIRECT_URI).toString(),
    response_type: 'code',
    v: '5.131',
    state: 'psmz'
  });

  const loginUrl = `https://oauth.vk.com/authorize?${oauthParams.toString()}`;

  return { loginUrl }
});

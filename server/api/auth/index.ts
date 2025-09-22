// import { defineEventHandler } from 'h3';
//
//export default defineEventHandler(() => {
//  const clientId = process.env.VK_CLIENT_ID;
//  const redirectUri = encodeURIComponent(process.env.VK_REDIRECT_URI!);
//
//  const oauthParams = new URLSearchParams({
//    client_id: process.env.VK_CLIENT_ID!,
//    display: 'page',
//    redirect_uri: new URL("/login/callback", process.env.VK_REDIRECT_URI).toString(),
//    response_type: 'code',
//    v: '5.131',
//    state: 'psmz'
//  });
//
//  const loginUrl = `https://oauth.vk.com/authorize?${oauthParams.toString()}`;
//
//  return { loginUrl }
//});

import { defineEventHandler, setCookie } from 'h3';
import crypto from 'node:crypto';

export default defineEventHandler((event) => {
  // Generate random state (CSRF protection, 32+ chars)
  const state = crypto.randomBytes(32).toString('hex');

  // Generate PKCE code_verifier (43-128 chars, base64url)
  const codeVerifier = crypto.randomBytes(32).toString('base64url')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Generate code_challenge = BASE64URL(SHA256(verifier))
  const codeChallengeBuffer = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
  const codeChallenge = codeChallengeBuffer
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Build redirect URI
  const redirectUri = new URL('/login/callback', process.env.HOST || 'http://localhost:3000').toString();

  // Scopes: Space-separated, add yours (e.g., for photos/wall in group posts)
  const scope = 'offline photos wall video docs'; // Adjust as needed

  // Auth URL params
  const oauthParams = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.VK_CLIENT_ID!,
    redirect_uri: redirectUri,
    scope: scope,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    // Optional: lang_id=0 (Russian), scheme='light' for theme
  });

  const loginUrl = `https://id.vk.com/authorize?${oauthParams.toString()}`;

  // Store state and verifier in httpOnly cookies (10 min expiry)
  setCookie(event, 'vk_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600, // 10 minutes
    path: '/',
  });
  setCookie(event, 'vk_verifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600,
    path: '/',
  });

  return { loginUrl };
});
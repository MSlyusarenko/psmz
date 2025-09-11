// ~~server/utils/session.ts
import jwt from "jsonwebtoken";
import { defineEventHandler } from 'h3';
import { getCookie, deleteCookie } from 'h3';
import type { SessionUser } from '~~/types';
import type { H3Event } from 'h3';

const createSessionToken = (session: SessionUser) => {
  return jwt.sign(session, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

const verifySessionToken = (token: string): SessionUser | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as SessionUser;
  } catch {
    return null;
  }
};

export const getUserSession = (event: H3Event): SessionUser | null => {
  const cookie = getCookie(event, 'session.token');
  if (!cookie) return null;

  return verifySessionToken(cookie);
};

export const deleteUserSession = (event: H3Event) => {
  deleteCookie(event, 'session.token'); // Убедись, что имя куки соответствует тому, что ты используешь
};

// Экспортируем функции
export { createSessionToken };

import jwt from "jsonwebtoken";
import { defineEventHandler } from 'h3';
import { getCookie } from 'h3';
import type { SessionUser } from '@/types'; // Импортируем интерфейс SessionUser
import type { H3Event } from 'h3'; // Импортируем H3Event

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

// Указываем тип H3Event для параметра event
export const getUserSession = (event: H3Event): SessionUser | null => {
  const cookie = getCookie(event, 'session.token');
  if (!cookie) return null;

  return verifySessionToken(cookie);
};

// Экспортируем функции
export { createSessionToken };

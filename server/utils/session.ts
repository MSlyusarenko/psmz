import jwt from "jsonwebtoken";

import type { H3Event } from "h3";

const createSessionToken = (session: SessionUser) => {
  const config = useRuntimeConfig();

  return jwt.sign(session, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};




const verifySessionToken = (token: string) => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, process.env.JWT_SECRET!, {
      ignoreExpiration: false,
    }) as SessionUser;
  } catch {
    return null;
  }
};

const getUserSession = (event: H3Event) => {
  const cookie = getCookie(event, "session.token");
  if (!cookie) return null;

  const sessionUser = verifySessionToken(cookie);
  if (!sessionUser) return null;

  return sessionUser;
};

export { createSessionToken, getUserSession };
import { getUserSession } from "~~/server/utils/session"; 
import { sendRedirect } from "h3"; 

export default defineEventHandler((event) => { 
  const userSession = getUserSession(event); 

  // Если пользователь не авторизован, перенаправляем его на главную страницу 
  if (!userSession) { 
    sendRedirect(event, '/'); 
  } 
});

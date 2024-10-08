import { getUserSession } from "../utils/session";

export default defineEventHandler((event) => {
  event.context.user = getUserSession(event);
});
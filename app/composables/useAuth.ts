// composables/useAuth.ts

import type { SessionUser } from '~~/types';

export const useAuth = () => {
  const authSession = useAuthSession();

  const setSessionUser = (session: SessionUser | null) => {
    authSession.value = session;
  };

  const userLogIn = async () => {
    if (!authSession.value) {
      const response = await $fetch<{ session: SessionUser }>("/api/session/check", {
        headers: useRequestHeaders(["cookie"]),
      });

      if (response && response.session) {
        setSessionUser(response.session);
        return response.session;
      }
    }
  };

  return {
    authSession,
    userLogIn,
  };
};


export const useAuth = () => {
    const authSession = useAuthSession();
  
    const setSessionUser = (session: SessionUser | null) => {
      authSession.value = session;
    };
  
    const userLogIn = async () => {
      if (!authSession.value) {
        const response = await $fetch("/api/v1/me", {
          headers: useRequestHeaders(["cookie"]),
        });
  
        setSessionUser(response.user);
  
        return response.user;
      }
    };
  
    return {
      authSession,
      userLogIn,
    };
  };
export default defineNuxtPlugin(async () => {
    const session = useAuthSession();
    const { userLogIn } = useAuth();
  
    await userLogIn();
  });
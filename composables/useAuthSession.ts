// composables/useAuthSession.ts
export const useAuthSession = () => {
    return useState<SessionUser | null>("session", () => null);
  };
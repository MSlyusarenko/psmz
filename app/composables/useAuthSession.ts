// composables/useAuthSession.ts
import { useState } from 'nuxt/app';
import type { SessionUser } from '~~/types';

export const useAuthSession = () => {
  return useState<SessionUser | null>('session', () => null);
};

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import { UserPermissions } from '@/constants/permissions'

export const useSessionStore = defineStore('session', {
  state: () => ({
    isLoaded: false,
    user: null as UserInfo | null
  }),
  getters: {
    isAdmin: (state) => !!((state.user?.permissions || 0) & UserPermissions.Administrator),
    isSuperadmin: (state) => state.user?.cityRaw === 0 && !!((state.user?.permissions || 0) & UserPermissions.Administrator),
    warningsCount: (state) => state.user == null ? 0 : state.user.reprimands.reduce((a, v) => a+v.score, 0) % 3,
    reprimandsCount: (state) => state.user == null ? 0 : Math.floor(state.user.reprimands.reduce((a, v) => a+v.score, 0) / 3),
    hasPermissions: (state) => {
      return (permissions: UserPermissions) => !!((state.user?.permissions || 0) & (UserPermissions.Administrator | permissions))
    }
  }
})

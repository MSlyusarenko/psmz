import { defineStore } from 'pinia'
import type { SidebarCategory } from '@/types/sidebar'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isLoaded: false,
    categories: [] as SidebarCategory[],
    startCategories: [] as SidebarCategory[],
    isMenuOpen: false
  }),
})

import Aura from '@primevue/themes/aura';
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  alias: {
    '~~': resolve(__dirname),
    '#root': resolve(__dirname), // для уверенности также определить #root
  },

  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/main.css', '~/assets/css/custom-theme.css'],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET, // Переносим сюда jwtSecret
    public: {
      version: '1.0.0'
    }
  },

  app: {
    pageTransition: { name: 'slide-left', mode: 'out-in' },
    head: {
      title: 'Автоматические приказы',
      meta: [
        { hid: 'description', name: 'description', content: 'Здесь можно исправить и создать приказы' },
        { hid: 'og:title', property: 'og:title', content: 'Автоматические приказы' },
        { hid: 'og:description', property: 'og:description', content: 'Здесь можно исправить и создать приказы' },
        { hid: 'og:image', property: 'og:image', content: 'https://auto-prikaz.vercel.app/preview.webp' },
        { hid: 'og:url', property: 'og:url', content: 'https://auto-prikaz.vercel.app' },
        { hid: 'og:type', property: 'og:type', content: 'website' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Icons'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap'
        }
      ],
      script: [
        {
          src: 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js',
          defer: true,
        },
      ],
    }
  },

  fonts: {
    families: [
      { name: 'Google Sans', provider: 'google' },
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    rollupConfig: {
      output: {
        format: 'es'
      }
    }
  },

  primevue: {
    options: {
      theme: {
        preset: Aura // Используйте тему Aura, чтобы сохранить её структуру, но цвета будут изменены кастомной темой
      },
      autoImport: true, // Включите автоматический импорт компонентов
    },
    components: {
      include: ['DataTable', 'Column', 'Select'],
    }
  },


  modules: ['@nuxt/fonts', '@nuxt/ui', '@primevue/nuxt-module']
})
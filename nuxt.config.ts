import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,

  css: ['~/assets/css/main.css', '@mdi/font/css/materialdesignicons.css'],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET, // Переносим сюда jwtSecret
    public: {
      version: '1.0.0'
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
      ]
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
        preset: Aura // Используй Aura как предустановленную тему
      },
      autoImport: true, // Включи автоматический импорт компонентов
    },
    components: {
      include: ['DataTable', 'Column'], // Импортируй DataTable
    }
  },


  modules: ['@nuxt/fonts', '@nuxt/ui', '@primevue/nuxt-module']
})
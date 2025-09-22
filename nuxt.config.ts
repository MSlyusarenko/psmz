import Aura from '@primevue/themes/aura';
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  alias: {
    '~~': resolve(__dirname),
    '#root': resolve(__dirname), // для уверенности #root
  },

  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/main.css', '~/assets/css/custom-theme.css'],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    public: {
      version: '1.0.0'
    }
  },

  app: {
    pageTransition: { name: 'slide-left', mode: 'out-in' },
    head: {
      title: 'Портал - Пресс-служба Министерства здравоохранения',
      meta: [
        { hid: 'description', name: 'description', content: 'Инструмент для работы с сообществами ВК' },
        { hid: 'og:title', property: 'og:title', content: 'Пресс-служба Министерства здравоохранения' },
        { hid: 'og:description', property: 'og:description', content: 'Инструмент для работы с сообществами ВК' },
        { hid: 'og:image', property: 'og:image', content: 'https://psmz.provportal.ru/preview.webp' },
        { hid: 'og:url', property: 'og:url', content: 'https://psmz.provportal.ru' },
        { hid: 'og:type', property: 'og:type', content: 'website' }
      ],
      link: [
        {
          rel: 'icon', type: 'image/x-icon',
          href: '/favicon.ico'
        },
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
        preset: Aura // Aura структуру, но цвета в custom
      },
      autoImport: true,
    },
    components: {
      include: ['DataTable', 'Column', 'Select'],
    }
  },

  ui: {
    colors: {
      primary: '#yourColorHex',  // цвет плашки (primary)
      // или любые другие цвета, например secondary, accent и т.п.
    }
  },

  modules: ['@nuxt/fonts', '@nuxt/ui', '@primevue/nuxt-module']
})
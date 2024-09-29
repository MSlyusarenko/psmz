// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css', '@mdi/font/css/materialdesignicons.css'],

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
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      version: '1.0.0'
    }
  },

  fonts: {
    families: [
      { name: 'Poppins', provider: 'google' },
    ]
  },
  
  modules: ['@nuxt/fonts', '@nuxt/ui']
})
<template>
  <div>
    <div class="mt-16 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Журнал аудита</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Действия пользователей
      </h4>
    </div>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'theme-color', content: '#2c2d31' },
    { name: 'theme-color', content: '#2c2d31', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#2c2d31', media: '(prefers-color-scheme: light)' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'msapplication-navbutton-color', content: '#2c2d31' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})

definePageMeta({
  layout: 'dash'
});
</script>

<style scoped>
.page-dash-style {
  text-align: center;
  padding: 20px;
}
</style>
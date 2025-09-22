<template>
    <div class="page-dash-style bg-[#2c2d31] size-full rounded-bl-2xl rounded-tl-2xl">
      <h3>Рейды</h3>
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
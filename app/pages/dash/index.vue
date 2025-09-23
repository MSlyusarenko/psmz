<template>
  <div>
    <div class="mt-16 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">0.1.0-Alpha</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Пока не самец
      </h4>
    </div>
    <div class="overflow-hidden rounded-2xl mb-6">
      <div class="flex items-center justify-center mb-0">
        <div class="bg-[#121212] shadow-lg overflow-hidden w-full p-6">
          <div class="">
            <h3 v-if="error">{{ error }}</h3>
            <div v-else>
              <img :src="user.avatar" alt="Avatar" class="avatar md:max-h-80 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl mb-6">
      <div class="flex items-center justify-center mb-0">
        <div class="bg-[#121212] shadow-lg overflow-hidden w-full p-6">
          <h3 v-if="error">{{ error }}</h3>
          <div v-else>
            <p>ID на сайте: {{ user.id }}</p>
            <p>ID ВКонтакте: {{ user.vk_id }}</p>
            <p>Имя: {{ user.first_name }}</p>
            <p>Фамилия: {{ user.last_name }}</p>
            <p>Дата создания: {{ formattedDate }}</p>
            <p>Город: {{ user.city }}</p>
            <p>Группа доступа: {{ user.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl">
      <div class="flex items-center justify-between mb-0">
        <div class="bg-[#121212] shadow-lg overflow-hidden w-full p-6 flex justify-end">
          <Button class="bt-main w-full" @click="goToMain">
            <div class="flex items-center">
              <img src="/psmz_logo_white.svg" alt="PSMZ Logo" class="custom-icon mr-1.5" />
              <span class="font-bold">На главную</span>
            </div>
          </Button>
        </div>
      </div>
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

import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
    router.push('/')
}

import { useFetch } from '#app'

definePageMeta({
  layout: 'dash'
});

const { data: user, error } = await useFetch('/api/profile')

// Проверяем, существует ли user и его createdAt перед формированием даты
const formattedDate = user && user.value.createdAt
  ? new Date(user.value.createdAt).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  : null
</script>

<style scoped>
.page-dash-style {
  text-align: center;
  padding: 20px;
  height: 100%;
  /* Обеспечивает, что элемент занимает всю высоту */
  overflow: auto;
  /* Позволяет содержимому скроллиться */
}
</style>

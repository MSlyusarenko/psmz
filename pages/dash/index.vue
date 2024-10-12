<template>
  <div class="profile">
    <h3 v-if="error">{{ error }}</h3>
    <div v-else>
      <img :src="user.avatar" alt="Avatar" class="avatar" />
      <p>ID на сайте: {{ user.id }}</p>
      <p>ID ВКонтакте: {{ user.vk_id }}</p>
      <p>Имя: {{ user.first_name }}</p>
      <p>Фамилия: {{ user.last_name }}</p>
      <p>Дата создания: {{ formattedDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from 'nuxt/app';
definePageMeta({
  middleware: ['auth'],
});

import { useFetch } from '#app'

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
.profile {
  text-align: center;
  padding: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin: 10px 0;
}
</style>
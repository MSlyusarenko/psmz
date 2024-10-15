<template>
  <div class="">
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
  height: 100%; /* Обеспечивает, что элемент занимает всю высоту */
  overflow: auto; /* Позволяет содержимому скроллиться */
}
</style>

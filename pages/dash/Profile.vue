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
      <button @click="logout" class="logout-button">Выйти</button>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'dash'
});

const { data: user, error } = await useFetch('/api/profile');
const router = useRouter();

// Проверяем, существует ли user и его createdAt перед формированием даты
const formattedDate = user && user.value.createdAt
  ? new Date(user.value.createdAt).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  : null;

// Функция для выхода
const logout = async () => {
  try {
    await $fetch('/api/auth/logout'); // Отправляем запрос на выход
    router.push('/auth'); // Перенаправляем на страницу авторизации
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
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

.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336; /* Цвет кнопки - красный */
  color: white; /* Цвет текста - белый */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #d32f2f; /* Темнее при наведении */
}
</style>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold mb-4">Профиль пользователя</h1>
      <img :src="user.avatar" alt="Аватар пользователя" class="w-32 h-32 rounded-full mb-4" />
      <p class="text-xl">Имя: {{ user.firstName }}</p>
      <p class="text-xl">Фамилия: {{ user.lastName }}</p>
      <p class="text-xl">ID на сайте: {{ user.id }}</p>
      <p class="text-xl">ID роли: {{ user.role }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'; // Импортируем useRouter
  
  const user = ref(null);
  const router = useRouter();
  
  onMounted(async () => {
    const vkId = new URLSearchParams(window.location.search).get('vk_id'); // Получаем vk_id из query параметров
  
    // Запрос к вашему API для получения информации о пользователе
    const response = await fetch(`/api/auth?vk_id=${vkId}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.exists) {
        user.value = data.user;
      } else {
        // Обработка случая, если пользователь не найден
        router.push('/'); // Перенаправляем на главную страницу
      }
    } else {
      // Обработка ошибки
      router.push('/'); // Перенаправляем на главную страницу
    }
  });
  </script>
  
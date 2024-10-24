<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Sidebar from '~/components/Sidebar.vue';

const router = useRouter();
const loading = ref(true);
const session = ref(null);

// Проверка сессии и перенаправление, если сессии нет
const checkSession = async () => {
  try {
    const response = await axios.get('/api/session/check');
    session.value = response.data?.session; // Устанавливаем данные сессии
    if (!session.value) {
      router.push('/auth');
    }
  } catch (error) {
    console.error('Ошибка при проверке сессии:', error);
    router.push('/auth');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  checkSession(); // Проверяем сессию при монтировании
});
</script>

<template>
  <div class="flex overflow-hidden">
    <Sidebar />
    <main class="flex flex-col flex-grow">
      <div class="content flex-grow overflow-y-auto page-dash-style bg-[#2c2d31] size-full rounded-bl-2xl rounded-tl-2xl">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-dash-style {
  /* text-align: center; */
  padding: 20px;
  height: 100%; /* Обеспечивает, что элемент занимает всю высоту */
  overflow: auto; /* Позволяет содержимому скроллиться */
}

.flex {
  display: flex;
  height: 100vh; /* Занимает полную высоту экрана */
}

main {
  flex: 1; /* Заставляет main занимать всё доступное пространство */
  display: flex;
  flex-direction: column; /* Убедитесь, что дочерние элементы располагаются вертикально */
}

.content {
  flex: 1; /* Заставляет контент занимать всё доступное пространство в main */
  overflow-y: auto; /* Прокрутка по вертикали, если контента больше, чем помещается на экран */
}
</style>
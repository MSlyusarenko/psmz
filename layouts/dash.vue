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
  <div class="flex">
    <Sidebar />
    <div class="content flex-grow">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content {
  margin-left: 0px; /* ширина боковой панели */
}
</style>

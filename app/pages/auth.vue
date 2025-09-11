<template>
    <div class="h-screen flex flex-col">
        <!-- TopBar -->
        <Topbar />

        <div class="flex-grow flex items-center justify-center relative">
            <div class="text-center">
                <section class="card-main shadow-main rounded-xl mb-36 md:mb-24">
                    <div class="p-6 md:p-12">
                        <h1 class="text-3xl pb-6 font-bold break-words text-main">
                            Панель управления
                        </h1>
                        <div>
                            <div class="pt-4">
                                <Button class="bt-vk font-bold" @click="login">
                                    <div class="flex items-center">
                                        <img src="/public/VK.svg" alt="VK" class="w-5 h-5 mr-1.5" />
                                        Войти с помощью VK ID
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Проверка сессии и перенаправление
const checkSession = async () => {
  try {
    // Убедитесь, что вы обращаетесь к правильному API
    const response = await axios.get('/api/session/check');
    return response.data; // Возвращаем данные сессии
  } catch (error) {
    console.error('Ошибка при проверке сессии:', error);
    return null; // Возвращаем null в случае ошибки
  }
};

onMounted(async () => {
  const sessionData = await checkSession(); // Проверяем сессию
  if (sessionData?.session) {
    // Если есть сессия, перенаправляем на /dash
    router.push('/dash');
  }
});

// Вход через VK
const login = async () => {
  try {
    const { data } = await axios.get('/api/auth'); // Получаем URL для входа через VK
    window.location.href = data.loginUrl; // Перенаправляем на VK для авторизации
  } catch (error) {
    console.error('Ошибка при получении URL для входа через VK:', error);
  }
};
</script>


<style scoped>
.auth {
    text-align: center;
    padding: 20px;
}
</style>

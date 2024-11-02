<template>
  <div>
    <div class="mt-14 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Мой профиль</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Различная информация о вас
      </h4>
    </div>
    <div class="overflow-hidden rounded-2xl mb-6">
      <div class="flex items-center justify-center mb-0">
        <div class="bg-[#121212] shadow-lg overflow-hidden w-full">
          <div class="relative blur-card">
            <!-- Размытие фона, указываем высоту и ширину больше, чем аватарка -->
            <div class="absolute inset-0 backdrop-blur-[50px] z-10 w-full top-[-30px] rounded-tl-2xl rounded-tr-2xl">
            </div>
            <img :src="user.avatar" alt="User Avatar" class="w-full h-36 object-cover" />
          </div>
          <div class="flex items-center relative z-20">
            <div class="ml-6 mr-2 mb-2 border-circle surface-card relative">
              <img :src="user.avatar" alt="User Avatar" class="border-circle border-4 border-[#121212]" height="126"
                width="126" />
            </div>
            <div class="mr-2 text-profile">
              <div class="md:p-0">
                <h2 class="text-xl font-bold text-white">{{ user.nickname ? user.nickname.split("_").join(" ") : "NoneNickname" }}</h2>
                <p class="text-lg font-bold text-gray-400">{{ user.position_psmz }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-hidden rounded-2xl mb-6">
      <div class="flex items-center justify-center mb-0">
        <div class="bg-[#121212] shadow-lg overflow-hidden w-full p-6">
          <h2 class="text-xl font-bold text-white">Информация</h2>
          <div class="mt-3">Ваш ID:
            <span class="font-bold select-all">{{ user.id }}</span>
          </div>
          <div class="mt-2">Вы работаете в:
            <span class="font-bold">{{ userCity }}</span>
          </div>
          <div>Ваша группа доступа:
            <span class="font-bold">{{ user.role }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-hidden rounded-2xl">
      <div class="flex items-center justify-between mb-0">
        <div class="bg-[#121212] shadow-lg overflow-hidden w-full p-6 flex justify-end">
          <Button class="log-bt" @click="logout">
            <div class="flex items-center">
              <span class="material-symbols-rounded mr-1.5">logout</span>
              <span class="font-bold">Выйти</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getCityName } from '~/server/utils/cities';

const users = ref([]);
const expandedRows = ref([]);

definePageMeta({
  layout: 'dash'
});

const { data: user, error } = await useFetch('/api/profile');

if (error.value) {
  console.error('Ошибка при получении данных пользователя:', error.value);
}

const userCity = user.value ? getCityName(Number(user.value.city)) : "Неизвестный город"; // Убедись, что user.value существует

const router = useRouter();
const showAvatarDialog = ref(false);

const formattedDate = user && user.value.createdAt
  ? new Date(user.value.createdAt).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  : null;

const logout = async () => {
  try {
    await $fetch('/api/auth/logout');
    router.push('/auth');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
</script>

<style scoped>
.blur-card {
  top: +30px;
}

.text-profile {
  margin-top: +30px;
}

.border-circle {
  border-radius: 50%;
  z-index: 30;
  /* Повышаем z-индекс, чтобы аватарка была выше размытия */
}

.page-dash-style {
  text-align: center;
  padding: 20px;
  height: auto;
  /* Изменено с 100% на auto */
  overflow: auto;
  /* Позволяет содержимому скроллиться */
}

.log-bt {
  padding: 12px 18px !important;
  border: none !important;
  border-radius: 6px !important;
  background-color: #ff4b32 !important;
  color: #ffffff !important;
  font-size: 1rem;
  cursor: pointer !important;
  transition: 0.3s ease !important;
}

.log-bt:hover {
  background-color: #d4311b !important;
  transition: 0.3s ease !important;
}

.log-bt:active {
  background-color: rgb(182, 37, 18) !important;
  transition: 0.01s ease !important;
}
</style>

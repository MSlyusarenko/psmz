<template>
  <div
    class="flex items-center p-2 hover:bg-[#2c2d31] rounded-lg cursor-pointer transition-all mb-1"
    :class="{ 'bg-[#ff4b32] text-white': isSelected }"
    @click="selectItem"
  >
    <i class="material-symbols-rounded text-white" :class="{ 'text-gray-400': !isSelected }">{{ link.icon }}</i>
    <span class="text-white ml-2 font-bold" :class="{ 'text-gray-400': !isSelected }">
      {{ link.title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps<{
  link: {
    title: string;
    icon: string;
    url: string; // URL для маршрута
  };
}>();

const isSelected = ref(false);
const router = useRouter();
const route = useRoute();

// Проверка, является ли текущий маршрут тем, на который ведет элемент навигации
const checkIfSelected = () => {
  isSelected.value = route.path === props.link.url; // Сравниваем текущий маршрут с URL элемента
};

// Запускаем проверку при изменении маршрута
watch(route, checkIfSelected, { immediate: true });

const selectItem = () => {
  router.push(props.link.url); // Переход по маршруту
};
</script>

<style scoped>
a.bg-gray-800 {
  border-radius: 0.5rem;
}
</style>

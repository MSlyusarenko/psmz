<template>
    <div class="sidebar bg-[#121212] h-screen w-64 p-4 select-none">
        <div class="flex items-center mb-4">
            <img src="/logo.svg" alt="Логотип" class="h-8 rounded-full" />
            <span class="text-white font-bold ml-4 text-xl">Сайт ПСМЗ</span>
        </div>
        <div>
            <SidebarCategory v-for="category in categories" :key="category.id" :category="category" />
        </div>
        <div class="bg-[#1e1e1e] p-4 mt-auto flex items-center rounded-lg">
            <img src="/logo.svg" alt="Аватар" class="rounded-full h-10" />
            <span class="text-white ml-2">Профиль</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SidebarCategory from './Sidebar/SidebarCategory.vue';

const categories = ref([
    {
        id: 1,
        title: 'Портал',
        links: [
            { title: 'Информация', icon: 'emoji_people', url: '/dash' },
        ],
        isCollapsed: false, // Развёрнуто по умолчанию
    },
    {
        id: 2,
        title: 'Редактирование',
        links: [
            { title: 'Панель управления', icon: 'dashboard', url: '/dash/control-panel' },
            { title: 'Журнал аудита', icon: 'history', url: '/dash/audit-log' },
        ],
        isCollapsed: false, // Развёрнуто по умолчанию
    },
    {
        id: 3,
        title: 'Настройки',
        links: [
            { title: 'Общие настройки', icon: 'settings', url: '/dash/settings' },
            { title: 'Управление пользователями', icon: 'people', url: '/dash/user-management' },
        ],
        isCollapsed: false, // Развёрнуто по умолчанию
    },
]);
</script>

<style scoped>
.sidebar {
    background-color: #121212;
}
</style>
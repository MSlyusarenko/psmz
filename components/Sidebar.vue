<template>
    <div class="sidebar bg-[#121212] h-screen w-64 p-4 select-none">
        <div 
            class="profile-sidebar p-4 mt-auto flex items-center rounded-lg cursor-pointer" 
            @click="selectProfile"
            :class="{
                'bg-[#ff4b32]': isActive,
                'bg-[#1e1e1e]': !isActive
            }"
        >
            <div class="rounded-full h-10 w-10 flex items-center justify-center">
                <img 
                    v-if="user"
                    :src="user.avatar" 
                    alt="Аватар" 
                    class="rounded-full h-10 transition-all duration-300" 
                />
            </div>
            <span class="text-white ml-2 font-bold">Профиль</span>
        </div>
        <div class="pt-2">
            <SidebarCategory v-for="category in categories" :key="category.id" :category="category" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#app';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import SidebarCategory from './Sidebar/SidebarCategory.vue';

// Описание структуры данных пользователя
interface User {
    avatar: string;
    first_name: string;
    last_name: string;
    // Добавьте другие поля, если они есть в вашем API
}

const { data: userData, error } = await useFetch<User>('/api/profile'); // Используем дженерик для указания типа данных
const user = ref<User | null>(null);

if (userData.value) {
    user.value = userData.value; // Присваиваем данные пользователя
}

const router = useRouter();
const route = useRoute();

// Проверяем, активна ли текущая страница профиля
const isActive = ref(route.path === '/dash/profile');

// Наблюдаем за изменением маршрута и обновляем isActive
watch(
    () => route.path,
    (newPath) => {
        isActive.value = newPath === '/dash/profile';
    }
);

const selectProfile = () => {
    router.push('/dash/profile');
};

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
            { title: 'Пользователи', icon: 'group', url: '/dash/users' },
            { title: 'Журнал аудита', icon: 'history', url: '/dash/audit' },
        ],
        isCollapsed: false, // Развёрнуто по умолчанию
    },
    {
        id: 3,
        title: 'Создание постов',
        links: [
            { title: 'Собеседование', icon: 'person_add', url: '/dash/interview' },
            { title: 'Рейд', icon: 'person_search', url: '/dash/raid' },
        ],
        isCollapsed: false, // Развёрнуто по умолчанию
    },
]);
</script>

<style scoped>
.sidebar {
    background-color: #121212;
}

.profile-sidebar:hover {
    background-color: #2c2d31;
    transition-duration: 150ms;
}
</style>

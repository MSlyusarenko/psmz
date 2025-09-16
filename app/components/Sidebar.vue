<template>
    <div>
        <!-- Мобильная версия сайдбара -->
        <div v-if="isMobile">

            <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleSidebar"></div>

            <div class="sidebar bg-[#121212] h-screen w-64 p-4 select-none fixed top-0 left-0 z-50 transition-transform duration-300"
                :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }"
                @click.self="toggleSidebar">
                <div class="profile-sidebar p-4 mt-auto flex items-center rounded-lg cursor-pointer"
                    @click="selectProfile" :class="{ 'bg-[#ff4b32]': isActive, 'bg-[#1e1e1e]': !isActive }">
                    <div class="rounded-full h-10 w-10 flex items-center justify-center">
                        <img v-if="user" :src="user.avatar" alt="Аватар"
                            class="rounded-full h-10 transition-all duration-300" />
                    </div>
                    <span class="text-white ml-2 font-bold">Профиль</span>
                </div>
                <div class="pt-2">
                    <SidebarCategory v-for="category in categories" :key="category.id" :category="category" />
                </div>
            </div>

            <!-- Кнопка для вызова сайдбара -->
            <Button class="sidebar-toggle mt-3 z-40" @click="toggleSidebar">
                <div class="flex items-center">
                    <span class="material-symbols-rounded py-1">menu</span>
                </div>
            </Button>
        </div>

        <!-- Версия для ПК -->
        <div v-else>
            <div class="sidebar bg-[#121212] h-screen w-64 p-4 select-none">
                <div class="profile-sidebar p-4 mt-auto flex items-center rounded-lg cursor-pointer"
                    @click="selectProfile" :class="{ 'bg-[#ff4b32]': isActive, 'bg-[#1e1e1e]': !isActive }">
                    <div class="rounded-full h-10 w-10 flex items-center justify-center">
                        <img v-if="user" :src="user.avatar" alt="Аватар"
                            class="rounded-full h-10 transition-all duration-300" />
                    </div>
                    <span class="text-white ml-2 font-bold">Профиль</span>
                </div>
                <div class="pt-2">
                    <SidebarCategory v-for="category in categories" :key="category.id" :category="category" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#app';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SidebarCategory from './Sidebar/SidebarCategory.vue';

definePageMeta({
  layout: 'dash'
});

interface User {
    avatar: string;
    first_name: string;
    last_name: string;
}

const { data: userData, error } = await useFetch<User>('/api/profile');
const user = ref<User | null>(null);

if (userData.value) {
    user.value = userData.value; // Присваиваем данные пользователя
}

const router = useRouter();
const route = useRoute();

const isActive = ref(route.path === '/dash/profile');

watch(
    () => route.path,
    (newPath) => {
        isActive.value = newPath === '/dash/profile';
    }
);

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

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
        isCollapsed: false,
    },
    {
        id: 2,
        title: 'Редактирование',
        links: [
            { title: 'Пользователи', icon: 'group', url: '/dash/users' },
            { title: 'Журнал аудита', icon: 'history', url: '/dash/audit' },
        ],
        isCollapsed: false,
    },
    {
        id: 3,
        title: 'Создание постов',
        links: [
            { title: 'Собеседование', icon: 'person_add', url: '/dash/interview' },
            { title: 'Рейд', icon: 'person_search', url: '/dash/raid' },
        ],
        isCollapsed: false,
    },
]);

const isMobile = ref(false);

onMounted(() => {
    if (process.client) {
        isMobile.value = window.innerWidth <= 768;
        window.addEventListener('resize', handleResize);
    }
});

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
};

onBeforeUnmount(() => {
    if (process.client) {
        window.removeEventListener('resize', handleResize);
    }
});
</script>

<style scoped>
.sidebar {
    background-color: #121212;
}

.profile-sidebar:hover {
    background-color: #2c2d31;
    transition-duration: 150ms;
}

.mobile-header {
    display: block;
}

/* Кнопка для вызова сайдбара */
.sidebar-toggle {
    position: absolute;
    border: none !important;
    -webkit-border-radius: 0px 6px 6px 0px !important;
    -moz-border-radius: 0px 6px 6px 0px !important;
    border-radius: 0px 6px 6px 0px !important;
    background-color: #ff4b32 !important;
    color: #ffffff !important;
    font-size: 1rem;
    cursor: pointer !important;
    transition: 0.3s ease !important;
}

/* Медиазапрос для мобильных устройств */
@media (max-width: 768px) {
    .sidebar {
        width: 75%;
        /* Уменьшите ширину, чтобы оставить место для клика */
    }
}
</style>
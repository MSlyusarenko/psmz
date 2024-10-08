<script setup lang="ts">
const session = useAuthSession();
const route = useRoute();

if (!session.value)
    navigateTo(`/login?redirect=${route.path}`, {
        redirectCode: 302,
        external: true,
    });
</script>

<template>
    <div
        v-if="!session"
        class="fixed top-0 left-0 h-screen w-screen bg-surface-100 dark:bg-surface-800 z-50"
    ></div>

    <nav
        class="fixed top-0 left-0 z-40 w-full flex items-center md:flex-col md:w-12 md:h-screen border-b-[1px] md:border-b-0 md:border-r-[1px] bg-surface-100/30 dark:bg-surface-900/30 border-surface-200 dark:border-surface-800 backdrop-blur-lg"
    >
        <a
            href="/"
            class="flex md:mt-3 w-full px-3 md:p-0 md:justify-center"
            v-ptooltip="'На главную'"
        >
            <img src="/logo-nobg.png" class="h-8" alt="Muri Logo" />
        </a>
        <div class="py-4 flex md:flex-col gap-2 items-center">
            <NuxtLink href="/dashboard" v-ptooltip="'Список серверов'"
                ><i
                    class="pi pi-th-large p-2 rounded-md hover:bg-surface-700/30 text-xl cursor-pointer"
            /></NuxtLink>
            <NuxtLink href="/dashboard/premium" v-ptooltip="'Премиум'"
                ><i
                    class="pi pi-star p-2 rounded-md hover:bg-surface-700/30 text-xl cursor-pointer"
            /></NuxtLink>
        </div>
    </nav>
    <div class="md:ml-16 pt-20 md:pt-4 pb-4 max-w-[1280px] px-3">
        <slot />
    </div>
</template>
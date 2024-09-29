<template>
    <div class="h-screen flex flex-col">
      <!-- TopBar -->
      <Topbar />
  
      <div class="flex-grow flex items-center justify-center relative">
        <div class="text-center">
        <section class="TopBarBg bg-slate-800 rounded-xl">
            <div class="grid grid-cols-1 md:grid-cols-3 place-items-stretch gap-4 p-6 mb-4">
                <NuxtLink class="nav-button" to="/">Исправление приказов</NuxtLink>
                <NuxtLink class="nav-button" to="/soon">Создание приказов</NuxtLink>
                <NuxtLink class="nav-button" to="/contacts">Связь с разработчиком</NuxtLink>
          </div>
        </section>
          <section class="bg-slate-800 rounded-xl mb-36 md:mb-24">
            <div class="p-6 md:p-12">
              <h1 class="text-3xl font-bold break-words text-main">
                Скоро
              </h1>
            </div>
          </section>
        </div>
  
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Topbar from '~/components/Topbar.vue';
import { useRouter } from 'vue-router';

useSeoMeta({
  title: 'Создание приказов',
  ogTitle: 'Создание приказов',
  description: 'Автоматическое создание приказов',
  ogDescription: 'Автоматическое создание приказов',
})

</script>
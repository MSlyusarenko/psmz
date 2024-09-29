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
            <UAvatar size="3xl"
              src="https://sun9-44.userapi.com/s/v1/ig2/PEIRLOfpu4mIDZX1k0j0bBeg33GBjgu0QPpJFZpCmedIlEwJePiNJdwBN6gmQHfSbLAd4lOGhoQ8yplduQL9ITwI.jpg?quality=95&crop=270,0,958,958&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=fZ9mTdixvhvnlGeayet0KXC7DWcXch_5kLvO06XC9zw&cs=200x200"
              alt="Avatar" />
            <h1 class="text-3xl font-bold break-words text-main">
              Матвей Слюсаренко
            </h1>
            <div class="flex justify-center mt-4">
              <Button class="buttonVK font-medium flex items-center" @click="vk">
                <img src="/VK.svg" alt="VK" class="w-4 h-4 mr-1.5" />
                ВКонтакте
              </Button>
            </div>
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
  title: 'Связь',
  ogTitle: 'Связь',
  description: 'Связь с разработчиком',
  ogDescription: 'Связь с разработчиком',
})

function vk() {
    window.open('https://vk.com/matvey_slyusarenko', '_blank');
    }
</script>
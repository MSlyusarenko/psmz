<template>
  <div class="h-screen flex flex-col">
    <!-- TopBar -->
    <Topbar />

    <div class="flex-grow flex items-center justify-center relative">
      <div class="text-center">
        <section class="card-main shadow-main rounded-xl mb-36 md:mb-24">
          <div class="p-6 md:p-12">
            <h1 class="text-3xl pb-6 font-bold break-words text-main">
              Сайт ПСМЗ
            </h1>
            <div>
              <div class="pt-4">
                <Button class="bt-main" @click="goToAuth">
                  <div class="flex items-center">
                    <span class="material-icons mr-1.5">newspaper</span>
                    <span class="font-bold">Панель управления</span>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Topbar from '~/components/Topbar.vue';

useSeoMeta({
  title: 'Исправление приказов',
  ogTitle: 'Исправление приказов',
  description: 'Автоматическое исправление приказов',
  ogDescription: 'Автоматическое исправление приказов',
});

const router = useRouter();
const isMobile = ref<boolean>(false);

const goToAuth = () => {
  router.push('/auth');
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
}); 
</script>
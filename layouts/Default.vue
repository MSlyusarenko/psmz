<template>
  <div>
    <GradientBackground />
    <Topbar />
    <NuxtPage />
    <nav class="topbar w-full py-4 fixed top-0 z-50 flex items-center">
      <div class="flex items-center ml-4">
        <img src="/public/logo.svg" class="h-8 mobile-logo" />
      </div>
    </nav>
    <section>
      <div>
        <Button class="absolute bottom-0 right-0 mb-4 mr-4 buttonGH font-medium" @click="github">
          <i class="mdi mdi-github"></i> Код на GitHub
        </Button>
      </div>
      <div>
        <section class="absolute bottom-0 left-0 mb-4 ml-4 SecVersion bg-slate-800 rounded-xl" @click="isOpen = true">
          V. 2.0.0-β
        </section>
      </div>
    </section>
    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
        <ul>
          <li class="mb-2"><b>● Версия 2.0.0-Beta</b></li>
        </ul>
        Возможны баги и недочёты!
        Скоро здесь будут расписаны обновления.
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import GradientBackground from '~/components/GradientBackground.vue';
import Topbar from '~/components/Topbar.vue';

const isOpen = ref(false)

function github() {
  window.open('https://github.com/MATVEY-Git-Hub/auto.prikaz.2', '_blank');
}
</script>
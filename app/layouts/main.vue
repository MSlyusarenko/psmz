<template>
  <div>
    <NuxtPage />
    <nav class="topbar w-full py-4 fixed top-0 z-50 flex items-center">
      <div class="flex items-center ml-4">
        <img src="/logo.svg" class="h-8 mobile-logo" />
      </div>
    </nav>
    <section>
      <div>
        <section class="absolute bottom-0 left-0 mb-4 ml-4 SecVersion bg-[#1e1e1e] rounded-xl" @click="isOpen = true">
          V. 0.1.0-β
        </section>
      </div>
    </section>
    <UModal v-model="isOpen">
      <div class="p-4 bg-black">
        <Placeholder class="h-48" />
        <ul>
          <li class="mb-2"><b>● Версия 0.1.0-Beta</b></li>
        </ul>
        Возможны баги и недочёты!
        Скоро здесь будут расписаны обновления.
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

function github() {
  window.open('https://github.com/MATVEY-Git-Hub/auto.prikaz.2', '_blank');
}
</script>
<template>
  <div class="overflow-hidden">
    <NuxtPage />

    <section class="text-sm text-gray-400 cursor-pointer absolute bottom-0 left-0 mb-4 ml-4 hidden sm:block" @click="isOpen = true">
      <span @click="isOpen = true">V. 0.1.0-β</span>
    </section>
    <UModal v-model="isOpen">
      <div class="p-4">
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
</script>
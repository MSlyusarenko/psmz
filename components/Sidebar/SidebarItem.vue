<template>
  <div
    class="flex items-center p-2 hover:bg-[#2c2d31] rounded-lg cursor-pointer transition-all"
    :class="{ 'bg-[#ff4b32] text-white': isSelected }"
    @click="selectItem"
  >
    <i class="material-icons text-white" :class="{ 'text-gray-400': !isSelected }">{{ link.icon }}</i>
    <a
      :href="link.url"
      class="text-white ml-2 font-bold"
      :class="{ 'text-gray-400': !isSelected }"
    >
      {{ link.title }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  link: {
    title: string;
    icon: string;
    url: string;
  };
}>();

const isSelected = ref(false);

const selectItem = () => {
  isSelected.value = true;
};
</script>

<style scoped>
a.bg-gray-800 {
  border-radius: 0.5rem;
}
</style>

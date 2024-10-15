<template>
    <div class="mb-4 rounded-lg overflow-hidden">
      <div
        class="flex justify-between items-center cursor-pointer p-2 hover:bg-[#2c2d31] rounded-lg transition-all"
        @click="toggle"
      >
        <span class="text-[#a0a0a0] font-bold">{{ category.title }}</span>
        <i class="material-icons text-[#a0a0a0]">{{ isCollapsed ? 'expand_more' : 'chevron_right' }}</i>
      </div>
  
      <!-- Анимация через max-height -->
      <transition name="slide">
        <div v-show="!isCollapsed" class="overflow-hidden" ref="content">
          <SidebarItem
            v-for="link in category.links"
            :key="link.title"
            :link="link"
          />
        </div>
      </transition>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, nextTick } from 'vue';
  import SidebarItem from '~/components/Sidebar/SidebarItem.vue';
  
  const props = defineProps<{
    category: {
      id: number;
      title: string;
      links: { title: string; icon: string; url: string }[];
      isCollapsed?: boolean;
    };
  }>();
  
  const isCollapsed = ref(props.category.isCollapsed ?? true);
  const content = ref<HTMLElement | null>(null);
  
  const toggle = async () => {
    isCollapsed.value = !isCollapsed.value;
    await nextTick();
    // Обновляем max-height после изменения видимости
    if (content.value) {
      content.value.style.maxHeight = isCollapsed.value ? '0px' : `${content.value.scrollHeight}px`;
    }
  };
  
  // Устанавливаем начальную max-height
  onMounted(() => {
    if (content.value) {
      content.value.style.maxHeight = isCollapsed.value ? '0px' : `${content.value.scrollHeight}px`;
    }
  });
  </script>
  
  <style scoped>
  /* Анимация для плавного разворачивания */
  .slide-enter-active, .slide-leave-active {
    transition: max-height 0.3s ease-in-out;
  }
  .slide-enter, .slide-leave-to {
    max-height: 0;
  }
  </style>
  
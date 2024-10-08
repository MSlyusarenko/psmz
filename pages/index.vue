<template>
  <div class="h-screen flex flex-col">
    <!-- TopBar -->
    <Topbar />

    <div class="flex-grow flex items-center justify-center relative">
      <div class="text-center">
        <section class="card-main shadow-main rounded-xl mb-36 md:mb-24">
          <div class="p-6 md:p-12">
            <h1 class="text-3xl pb-6 font-bold break-words text-main">
              Панель управления
            </h1>
            <div>
              <div class="pt-4">
                <Button class="bt-vk font-medium" @click="copy">
                  <div class="flex items-center">
                    <img src="/VK.svg" alt="VK" class="w-5 h-5 mr-1.5" />
                    Войти с помощью VK ID
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Topbar from '~/components/Topbar.vue';

useSeoMeta({
  title: 'Исправление приказов',
  ogTitle: 'Исправление приказов',
  description: 'Автоматическое исправление приказов',
  ogDescription: 'Автоматическое исправление приказов',
})

const badOrderNumber = ref<number | null>(null);
const badFinishOrderNumber = ref<number | null>(null);
const orderOffset = ref<number | null>(null);
const isMobile = ref<boolean>(false);

const isDisabled = computed(() => {
  return (
    badOrderNumber.value === null ||
    badFinishOrderNumber.value === null ||
    orderOffset.value === null ||
    badOrderNumber.value === 0 ||
    badFinishOrderNumber.value === 0 ||
    orderOffset.value === null ||
    orderOffset.value === 0
  );
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const toast = useToast();

const copy = () => {
  let stroke = `Приказы:\n`;
  console.log(badOrderNumber.value, badFinishOrderNumber.value, orderOffset.value);

  if (badFinishOrderNumber.value! == 0 || badOrderNumber.value! == 0 || orderOffset.value! == 0) {
    useToast().add({
      color: "red",
      title: 'Ты меня обманул!',
      description: 'Введи во все поля данные, иначе не дам я тебе приказы!',
    });
    return;
  }

  let currentOrder = badOrderNumber.value!;
  while (currentOrder <= badFinishOrderNumber.value!) {
    stroke += `#${currentOrder} -> #${currentOrder + orderOffset.value!}\n`;
    currentOrder++;
  }

  console.log(stroke);
  navigator.clipboard.writeText(stroke).then(
    () => {
      console.log("Текст скопирован успешно!");
      if (badFinishOrderNumber.value! == badOrderNumber.value!) {
        useToast().add({
          title: 'Приказы скопированы! Но смысл?',
          description: stroke
            .replace("Приказы:\n", "")
            .replace(/\n/g, '<br />'),
        });
      }
      useToast().add({
        title: 'Приказы скопированы!',
        description: stroke
          .replace("Приказы:\n", "")
          .replace(/\n/g, '<br />'),
      });
    },
    (err) => {
      console.error("Не удалось скопировать текст: ", err);
    }
  );
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

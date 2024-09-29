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
            <h1 class="text-3xl pb-12 font-bold break-words text-main">
              Автоматическое исправление приказов
            </h1>
            <div>
              <div class="grid grid-cols-1 md:grid-cols-2 place-items-stretch gap-4">
                <div>
                  <UInput
                    v-model.number="badOrderNumber"
                    ref="inputField1"
                    id="myInput3"
                    name="myInput3"
                    color="white"
                    variant="outline"
                    type="number"
                    placeholder="№ первого неверного приказа (3971)"
                  />
                </div>
                <div>
                  <UInput
                    v-model.number="badFinishOrderNumber"
                    ref="inputField2"
                    id="myInput4"
                    name="myInput4"
                    color="white"
                    variant="outline"
                    type="number"
                    placeholder="№ последнего неверного приказа (3989)"
                  />
                </div>
              </div>
              <UInput
                v-model.number="orderOffset"
                ref="inputFieldS"
                id="myInput2"
                name="myInput2"
                class="pt-4"
                color="white"
                variant="outline"
                type="number"
                :placeholder="isMobile
                  ? 'Смещение № невер. до вер. (3971 -> 3973)'
                  : 'Смещение № первого неверного приказа от верного (3971 -> 3973)'"
              />
            </div>
            <div class="pt-4">
              <Button 
                :class="isDisabled ? 'bt-copy-disabled font-medium' : 'bt-copy font-medium'" 
                @click="copy"
                :disabled="isDisabled"
              >
                {{ isDisabled ? 'Введите данные' : 'Скопировать приказы' }}
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

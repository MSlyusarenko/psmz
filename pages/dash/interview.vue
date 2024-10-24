<template>
  <div class="page-dash-style bg-[#2c2d31] size-full rounded-bl-2xl rounded-tl-2xl">
    <h3>Собеседование</h3>
    <div>
      <button v-if="user?.city === 1" class="l-2" @click="postToGroup(1)" style="background-color: blue; color: white;">Синяя кнопка</button>
    </div>
    <div>
      <button v-if="user?.city === 2" class="l-2" @click="postToGroup(2)" style="background-color: red; color: white;">Красная кнопка</button>
    </div>
    <div>
      <button v-if="user?.city === 3" class="l-2" @click="postToGroup(3)" style="background-color: green; color: white;">Зелёная кнопка</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '#app'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAsyncData } from 'nuxt/app';

const { data: user, error } = await useFetch('/api/profile');
const router = useRouter();

const postToGroup = async (groupNumber: number) => {
  try {
    const message = "Это тест публикации в этой группе через бота ПСМЗ";
    
    const response = await useAsyncData(() => $fetch('/api/postToVk', {
      method: 'POST',
      body: {
        groupNumber,  // Убедитесь, что здесь передается правильный номер группы
        message
      }
    }));

    if (response.error.value) {
      throw new Error('Ошибка при публикации поста');
    }
    alert('Пост успешно опубликован');
  } catch (error) {
    console.error('Ошибка при публикации поста', error);
    alert('Ошибка при публикации поста');
  }
};



definePageMeta({
  layout: 'dash'
});
</script>

<style scoped>
.page-dash-style {
  /* text-align: center; */
  padding: 20px;
}
</style>
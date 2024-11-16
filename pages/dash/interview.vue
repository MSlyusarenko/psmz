<template>
  <div>
    <div class="mt-14 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Конструктор постов</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Создание постов
      </h4>
    </div>

    <!-- Поле ввода текста поста -->
    <div class="mb-4">
      <textarea
        v-model="postText"
        placeholder="Введите текст поста..."
        class="w-full p-2 border rounded-md"
        rows="4"
      ></textarea>
    </div>

    <div>
      <button v-if="user?.city === 1" class="l-2" @click="postToGroup(1)" style="background-color: blue; color: white;">
        Синяя кнопка
      </button>
    </div>
    <div>
      <button v-if="user?.city === 2" class="l-2" @click="postToGroup(2)" style="background-color: red; color: white;">
        Красная кнопка
      </button>
    </div>
    <div>
      <button v-if="user?.city === 3" class="l-2" @click="postToGroup(3)" style="background-color: green; color: white;">
        Зелёная кнопка
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '#app'
import { ref } from 'vue'
import { useAsyncData } from 'nuxt/app'

definePageMeta({
  layout: 'dash',
});

const { data: user } = await useFetch('/api/profile')

const postText = ref('')

const postToGroup = async (groupNumber: number) => {
  try {
    if (!postText.value.trim()) {
      alert('Текст поста не может быть пустым')
      return
    }

    const message = postText.value // Получаем текст из поля ввода

    const response = await useAsyncData(() => $fetch('/api/postToVk', {
      method: 'POST',
      body: { groupNumber, message }
    }))

    if (response.error.value) {
      throw new Error('Ошибка при публикации поста')
    }

    alert('Пост успешно опубликован')
    postText.value = '' // Очищаем поле ввода после успешной публикации
  } catch (error) {
    console.error('Ошибка при публикации поста', error)
    alert('Ошибка при публикации поста')
  }
}
</script>

<style scoped>
.page-dash-style {
  padding: 20px;
}
</style>
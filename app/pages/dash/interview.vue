<template>
  <div>
    <div class="mt-16 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Конструктор постов</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Создание постов
      </h4>
    </div>

    <!-- Поле ввода текста поста -->
    <div class="mb-4">
      <textarea v-model="postText" placeholder="Введите текст поста..." class="w-full p-2 border rounded-md"
        rows="4"></textarea>
    </div>

    <!-- Поле для загрузки файлов -->
    <div class="mb-4">
      <input type="file" multiple @change="handleFileUpload" />
    </div>

    <!-- Отображение загруженных файлов -->
    <div class="file-preview mb-4">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <img
          v-if="isImage(file)"
          :src="filePreview(file)"
          alt="Preview"
          class="file-thumbnail"
        />
        <span v-else class="file-name">{{ file.name }}</span>
        <button @click="removeFile(index)" class="remove-btn">Удалить</button>
      </div>
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
import axios from 'axios'

const { data: user } = await useFetch('/api/profile')

const postText = ref('')
const files = ref<File[]>([])

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    files.value = Array.from(input.files)
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const isImage = (file: File) => {
  return file.type.startsWith('image/')
}

const filePreview = (file: File) => {
  return URL.createObjectURL(file)
}

const session = ref(null);

const getUserToken = async () => { 
  try { 
    const response = await axios.get('/api/session/check'); 
    session.value = response.data?.session; // Устанавливаем данные сессии 
    if (!session.value) { 
      console.error('Сессия не найдена'); 
    } 
  } catch (error) { 
    console.error('Ошибка при получении токена пользователя:', error); 
  } finally { 
    console.log (session.value.userTokenSession) 
    return session.value.userTokenSession 
  } 
};

const postToGroup = async (groupNumber: number) => {
  try {
    if (!postText.value.trim() && files.value.length === 0) {
      alert('Текст поста или файл не могут быть пустыми')
      return
    }

    const userToken = await getUserToken();

    const formData = new FormData()
    formData.append('groupNumber', groupNumber.toString())
    formData.append('message', postText.value)
    formData.append('userTokenSession', userToken)
    files.value.forEach((file, index) => {
      formData.append(`file${index}`, file)
    })

    const { data: response, error } = await useFetch('/api/postToVk', {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      throw new Error('Ошибка при публикации поста')
    }

    alert('Пост успешно опубликован')
    postText.value = ''
    files.value = []
  } catch (error) {
    console.error('Ошибка при публикации поста', error)
    alert('Ошибка при публикации поста')
  }
}

definePageMeta({
  layout: 'dash',
});
</script>

<style scoped>
.file-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.file-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.file-name {
  font-size: 14px;
  margin-top: 5px;
}

.remove-btn {
  margin-top: 5px;
  padding: 4px 8px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #ff1a1a;
}
</style>

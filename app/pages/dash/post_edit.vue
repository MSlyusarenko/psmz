<template>
  <div>
    <div class="mt-16 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Конструктор постов</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Создание постов
      </h4>
    </div>

    <!-- Форма -->
    <div class="mb-4">
      <div class="bg-[#121212] shadow-lg overflow-hidden w-full rounded-2xl">
        <div class="p-6 gap-4 relative z-20">
          <!-- Сетка, адаптивная для мобильных -->
          <div class="grid grid-cols-1 lg:grid-cols-10 gap-4">
            <!-- Левая колонка: текст -->
            <div class="flex flex-col gap-1.5 lg:col-span-4">
              <label for="postText" class="font-bold text-sm lg:text-base">Текст поста</label>
              <Textarea v-model="postText" rows="20" autoResize placeholder="Введите текст поста..." class="w-full" />
              <small class="text-xs lg:text-sm text-color-secondary">
                Примерно так пост будет выглядеть с ПК
              </small>
            </div>

            <!-- Правая колонка: загрузка + превью -->
            <div class="flex flex-col gap-4 lg:col-span-6">
              <!-- Загрузка файлов -->
              <div class="flex flex-col gap-1.5">
                <label class="font-bold text-sm lg:text-base">Загрузка изображений</label>
                <!-- Кнопка -->
                <div>
                  <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileUpload" />
                  <Button type="button" class="p-button-secondary w-full mb-2" @click="triggerFileInput">
                    <div class="flex items-center justify-center">
                      <span class="material-symbols-rounded mr-1.5">note_stack_add</span>
                      <span class="font-bold">Выбрать файлы</span>
                    </div>
                  </Button>
                </div>
              </div>

              <!-- Отображение загруженных файлов -->
              <div class="file-preview">
                <draggable v-model="files" item-key="name" class="flex flex-wrap gap-2">
                  <template #item="{ element, index }">
                    <div class="file-item">
                      <img v-if="isImage(element)" :src="filePreview(element)" alt="Preview"
                        class="file-thumbnail mb-2" />
                      <span v-else class="file-name">{{ element.name }}</span>
                      <Button class="p-button-danger w-full mb-2" @click="removeFile(index)">
                        <div class="flex items-center">
                          <span class="material-symbols-rounded mr-1.5">delete</span>
                          <span class="font-bold">Удалить</span>
                        </div>
                      </Button>
                    </div>
                  </template>
                </draggable>
              </div>
            </div>

            <!-- Переключатель города (на всю ширину) -->
            <div class="flex flex-col gap-1.5 lg:col-span-10 w-full">
              <SelectButton v-model="selectedCity" :options="cityOptions" optionLabel="label" optionValue="value"
                :disabled="optionDisabled" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- Кнопка публикации -->
    <div class="bg-[#121212] shadow-lg overflow-hidden w-full rounded-2xl">
      <div class="p-6 gap-4 relative z-20">
        <Button class="p-button-success w-full" :disabled="!selectedCity || (!postText.trim() && files.length === 0)"
          @click="postToGroup(selectedCity)">
          <div class="flex items-center">
            <span class="material-symbols-rounded mr-1.5">fact_check</span>
            <span class="font-bold">Опубликовать пост</span>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '#app'
import draggable from 'vuedraggable'

const { data: user } = await useFetch('/api/profile')

const postText = ref('')
const files = ref<File[]>([])

// доступный только 1 вариант – по user.city
const cityOptions = [
  { label: 'ОКБ-М', value: 1, color: 'blue' },
  { label: 'ЦГБ-П', value: 2, color: 'red' },
  { label: 'ЦГБ-Н', value: 3, color: 'green' }
]

const selectedCity = ref(user.value?.city ?? null)

// делаем computed: можно заблокировать недоступные варианты
const optionDisabled = computed(() => {
  // если у пользователя только один город
  return (option: any) => option.value !== user.value?.city
})

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const selectedFiles = Array.from(input.files)
    if (selectedFiles.length + files.value.length > 10) {
      alert('Максимум можно 10 фотографий в пост')
      // берём только недостающие
      const allowedCount = 10 - files.value.length
      files.value = [...files.value, ...selectedFiles.slice(0, allowedCount)]
    } else {
      files.value = [...files.value, ...selectedFiles]
    }
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const isImage = (file: File) => file.type.startsWith('image/')
const filePreview = (file: File) => URL.createObjectURL(file)

const postToGroup = async (groupNumber: number) => {
  try {
    if (!postText.value.trim() && files.value.length === 0) {
      alert('Текст поста или файл не могут быть пустыми')
      return
    }

    const formData = new FormData()
    formData.append('groupNumber', groupNumber.toString())
    formData.append('message', postText.value)
    files.value.forEach((file, index) => {
      formData.append(`file${index}`, file)
    })

    const { error } = await useFetch('/api/postToVk', {
      method: 'POST',
      body: formData
    })

    if (error.value) throw new Error('Ошибка при публикации поста')

    alert('Пост успешно опубликован')
    postText.value = ''
    files.value = []
  } catch (e) {
    console.error('Ошибка при публикации поста', e)
    alert('Ошибка при публикации поста')
  }
}

definePageMeta({ layout: 'dash' })
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
  width: 164px;
  height: 156px;
  object-fit: cover;
  border-radius: 8px;
}

.file-name {
  font-size: 14px;
  margin-top: 5px;
}
</style>

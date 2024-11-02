<template>
  <div>
    <div class="mt-14 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Редактирование пользователя</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Изменение данных
      </h4>
    </div>

    <div v-if="user">
      <div class="mb-4 overflow-hidden rounded-2xl">
        <div class="flex items-center justify-between">
          <div class="bg-[#121212] shadow-lg overflow-hidden w-full flex">
            <div class="p-6 flex items-center relative z-20">
              <div class="mr-2 border-circle surface-card relative">
                <img :src="user.avatar" alt="User Avatar" class="border-circle border-4 border-[#121212]" height="68"
                  width="68" />
              </div>
              <div class="mr-2 text-profile">
                <div class="md:p-0 space-y-0">
                  <h2 class="text-xl font-bold text-white mb-0">{{ user.nickname }}</h2>
                  <p class="text-lg font-bold text-gray-400 mb-0">{{ user.position_psmz }} [{{ user.rank }}]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Форма для редактирования полей пользователя -->
      <div class="bg-[#121212] shadow-lg overflow-hidden w-full rounded-2xl">
        <div class="p-6 gap-4 relative z-20">
          <form @submit.prevent="saveUser" class="w-full">
            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-3 flex flex-col gap-1.5">
                <label for="nickname" class="font-bold">Никнейм</label>
                <InputText id="nickname" v-model="user.nickname" aria-describedby="nickname-help"
                  placeholder="Ivan_Pupkin" />
                <small id="nickname-help" class="">Никнейм в формате Имя_Фамилия</small>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="font-bold">Банковский счёт</label>
                <InputNumber id="bank" v-model="user.bank" aria-describedby="bank-help" :max="999999" />
                <small id="bank-help" class="text-color-secondary">Банковский счёт пользователя</small>
              </div>
              <div class="col-span-3 flex flex-col gap-1.5">
                <label for="position_psmz" class="font-bold">Должность в ПСМЗ</label>
                <InputText id="position_psmz" v-model="user.position_psmz" placeholder="Контент-менеджер"
                  aria-describedby="position_psmz-help" />
                <small id="position_psmz-help" class="text-color-secondary">Пример: Контент-менеджер</small>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="rank" class="font-bold">Ранг</label>
                <InputNumber id="rank" v-model="user.rank" :min="1" :max="10" />
                <small id="rank-help" class="text-color-secondary">Системный ранг пользователя</small>
              </div>
              <div class="col-span-4 flex flex-col gap-1.5">
                <label for="city" class="font-bold">Город:</label>
                <Dropdown class='dropdown-custom'  v-model="user.city" :options="cities" optionLabel="name" optionValue="value"/>
                <small id="city-help" class="text-color-secondary">Город, к которому привязан пользователь</small>
              </div>
            </div>

            <!-- Кнопки сохранения и отмены -->
            <div class="flex gap-2 mt-4">
              <Button type="submit" class="bt-save">
                <div class="flex items-center">
                  <span class="material-symbols-rounded mr-1.5">save</span>
                  <span class="font-bold">Сохранить</span>
                </div>
              </Button>
              <Button class="bt-cancel" @click="$router.push('/dash/users')">
                <div class="flex items-center">
                  <span class="material-symbols-rounded mr-1.5">person_off</span>
                  <span class="font-bold">Отмена</span>
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Загрузка пользователя...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const userId = route.params.id;
const user = ref(null);
const cities = ref([
  { name: 'ОКБ г. Мирный', value: '1' },
  { name: 'ЦГБ г. Приволжск', value: '2' },
  { name: 'ЦГБ г. Невский', value: '3' },
]);

definePageMeta({
  layout: 'dash',
});

// Функция для загрузки пользователя по ID
const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    user.value = response.data;

    user.value.city = String(user.value.city);

    if (!cities.value.find(city => city.value === user.value.city)) {
      user.value.city = null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке пользователя:', error);
  }
};


// Функция для сохранения изменений
const saveUser = async () => {
  try {
    await axios.put(`/api/users/put/${userId}`, user.value);
    router.push('/dash/users');
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error);
  }
};

onMounted(fetchUser);
</script>

<style>
.border-circle {
  border-radius: 50%;
}
</style>

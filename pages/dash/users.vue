<template>
  <div class="overflow-hidden rounded-2xl">
    <DataTable :value="users" responsiveLayout="scroll" v-model:expandedRows="expandedRows" data-key="id" showGridlines removable-sort>
      <!-- Стрелка для разворачивания строки с действиями -->
      <Column expander style="width: 3rem" />

      <!-- Столбец с аватаркой и никнеймом -->
      <Column header="Никнейм" field="nickname" sortable>
        <template #body="slotProps">
          <div class="flex items-center">
            <img :src="slotProps.data.avatar" alt="User Avatar" class="w-8 h-8 rounded-full mr-2" />
            <span :class="getNicknameColor(slotProps.data.city)" class="font-bold">{{ slotProps.data.nickname }}</span>
          </div>
        </template>
      </Column>

      <!-- Остальные столбцы аналогично -->
      <Column field="id" header="ID" sortable :style="{ width: '50px' }" />
      <Column header="Город" field="city" sortable>
        <template #body="slotProps">
          {{ getCityName(slotProps.data.city) }}
        </template>
      </Column>
      <Column field="role" header="Роль" sortable />
      <Column field="position_psmz" header="Должность в ПСМЗ" sortable />
      <Column field="position_mz" header="Должность в МЗ" sortable />
      <Column field="rank" header="Ранг" sortable />
      <Column field="bank" header="Банк" sortable />

      <!-- Разворачиваемая строка с действиями -->
      <template #expansion="{ data }">
        <div class="flex flex-column">
          <Button label="Редактировать" @click="editUser(data.id)" class="bg-table mr-2" />
          <Button label="Удалить" @click="deleteUser(data.id)" class="bg-table mr-2" />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const expandedRows = ref([]);

// Функция для получения пользователей
const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users'); // Убедитесь, что путь корректен
    users.value = response.data.map(user => {
      return {
        ...user,
      };
    });
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
  }
};

// Функция для получения названия города
const getCityName = (cityId) => {
  const cities = {
    1: 'Мирный',
    2: 'Приволжск',
    3: 'Невский',
  };
  return cities[cityId] || 'Неизвестный город'; // Возвращаем название города или 'Неизвестный город'
};

// Функция для получения цвета никнейма в зависимости от города
const getNicknameColor = (cityId) => {
  switch (cityId) {
    case 1:
      return 'text-blue-400';
    case 2:
      return 'text-red-400';
    case 3:
      return 'text-green-400';
    default:
      return 'text-gray-400'; // Цвет по умолчанию
  }
};

// Функция для редактирования пользователя
const editUser = (id) => {
  console.log('Редактировать пользователя с ID:', id); // Здесь вы можете добавить логику редактирования
};

// Функция для удаления пользователя
const deleteUser = (id) => {
  console.log('Удалить пользователя с ID:', id); // Здесь вы можете добавить логику удаления
};

// Определение метаданных страницы
definePageMeta({
  layout: 'dash'
});

// Получение пользователей при монтировании компонента
onMounted(fetchUsers);
</script>

<style scoped>
.bg-table {
  background: #ff4b32 !important;
  border: 1px solid #ff4b32 !important;
  color: #ffffff;
}

.bg-table:hover {
  background: #ff3f25 !important;
  border: 1px solid #ff3f25 !important;
  color: #ffffff;
}

.bg-table:focus {
  box-shadow: 0 0 0 2px #271c1c, 0 0 0 4px #ff3f25, 0 1px 2px 0 rgba(0, 0, 0, 0);
  color: #ffffff;
}
</style>

<template>
  <div>
    <div class="mt-16 md:mt-4 mb-4">
      <h2 class="font-bold text-2xl mb-0">Пользователи</h2>
      <h4 class="font-bold text-color-secondary mt-0 text-[#a7a8a9]">
        Редактирование пользователей
      </h4>
    </div>

    <!-- Контейнер таблицы с горизонтальной прокруткой -->
    <div class="rounded-2xl overflow-x-auto w-full">
      <div class="min-w-[900px]" style="-webkit-overflow-scrolling: touch; touch-action: pan-x;">
        <DataTable :value="users" v-model:expandedRows="expandedRows" data-key="id" showGridlines :paginator="false"
          :rowsPerPageOptions="[10, 20, 30, 40, 50]" :rows="usersTableRows" @update:rows="changeRows" removable-sort
          scrollable scrollDirection="both">
          <!-- Стрелка -->
          <Column expander style="width: 3rem" />

          <!-- Никнейм -->
          <Column header="Никнейм" field="nickname" sortable style="min-width: 256px">
            <template #body="slotProps">
              <div class="flex items-center">
                <img :src="slotProps.data.avatar" alt="User Avatar" class="w-8 h-8 rounded-full mr-2" />
                <span :class="getNicknameColor(slotProps.data.city)" class="font-bold">
                  {{ slotProps.data.nickname }}
                </span>
              </div>
            </template>
          </Column>

          <!-- Остальные столбцы -->
          <Column header="Город" field="city" sortable>
            <template #body="slotProps">
              {{ getCityName(Number(slotProps.data.city)) }}
            </template>
          </Column>
          <Column field="role" header="Роль" sortable />
          <Column field="position_psmz" header="Должность в ПСМЗ" sortable />
          <Column field="rank" header="Ранг" sortable />
          <Column field="bank" header="Банк" sortable />

          <!-- Разворачиваемая строка -->
          <template #expansion="{ data }">
            <div class="mb-4">
              <span>ID пользователя: {{ data.id }}</span>
            </div>
            <div class="flex flex-column">
              <Button label="Редактировать" @click="goToEditUser(data.id)" class="bg-table mr-2" />
              <Button label="Удалить" class="bg-table mr-2 " />
              <!-- <Button label="Удалить" @click="deleteUser(data.id)" class="bg-table mr-2 " /> -->
            </div>
          </template>
        </DataTable>
      </div>
    </div>
    <div class="rounded-2xl mt-2 w-full">
      <Paginator :rows="usersTableRows" :totalRecords="users.length" :rowsPerPageOptions="[10, 20, 30, 40, 50]"
        v-model:first="first" @rows-change="changeRows" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const usersTableRows = ref(20);
const first = ref(0);

const changeRows = (rows: number) => {
  usersTableRows.value = rows;
};

const users = ref([]);
const expandedRows = ref([]);
const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    users.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
  }
};

const getCityName = (cityId: number): string => {
  const cities: { [key: number]: string } = {
    1: 'Мирный',
    2: 'Приволжск',
    3: 'Невский',
  };
  return cities[cityId] || 'Неизвестный город';
};

const getNicknameColor = (cityId: number) => {
  switch (cityId) {
    case 1:
      return 'text-blue-400';
    case 2:
      return 'text-red-400';
    case 3:
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
};

const goToEditUser = (id: number) => {
  router.push(`users/edit/${id}`);
};

const deleteUser = async (id: number) => {
  try {
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
};

definePageMeta({
  layout: 'dash',
});

onMounted(fetchUsers);
</script>

<style scoped>
.bg-table {
  background: #ff4b32 !important;
  border: 1px solid #ff4b32 !important;
  color: #ffffff !important;
}

.bg-table:hover {
  background: #ff3f25 !important;
  border: 1px solid #ff3f25 !important;
  color: #ffffff !important;
}

.bg-table:focus {
  box-shadow: 0 0 0 2px #271c1c, 0 0 0 4px #ff3f25, 0 1px 2px 0 rgba(0, 0, 0, 0);
  color: #ffffff !important;
}
</style>

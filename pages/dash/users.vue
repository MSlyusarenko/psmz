<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Список пользователей</h1>
    <DataTable :value="users" paginator rows="10" :loading="loading">
      <Column field="nickname" header="Никнейм" sortable></Column>
      <Column field="city" header="Город" sortable></Column>
      <Column header="Действия">
        <template #body="{ data }">
          <Button label="Удалить" icon="pi pi-trash" @click="deleteUser(data)" class="p-button-danger" />
        </template>
      </Column>
    </DataTable>

    <p v-if="!users.length" class="mt-4">Пользователи не найдены.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const users = ref<any[]>([]);
const loading = ref(true);

// Эмуляция загрузки данных
const fetchUsers = async () => {
  loading.value = true;
  try {
    // Здесь должна быть ваша логика получения пользователей
    // Например, через API
    users.value = [
      { id: 1, nickname: 'user1', city: 'Мирный' },
      { id: 2, nickname: 'user2', city: 'Приволжск' },
      { id: 3, nickname: 'user3', city: 'Невский' },
    ];
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
  } finally {
    loading.value = false;
  }
};

const deleteUser = (user: { nickname: string }) => {
  // Логика удаления пользователя
  console.log(`Удален пользователь: ${user.nickname}`);
  // Удаление пользователя из массива (здесь для примера)
  users.value = users.value.filter(u => u.nickname !== user.nickname);
};

// Загрузка пользователей при монтировании компонента
onMounted(fetchUsers);
</script>

<style scoped>
/* Вы можете добавить свои стили, если это необходимо */
</style>

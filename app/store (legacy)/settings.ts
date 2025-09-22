import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const canSendReports = ref(true);
    const showSnow = ref(true);
    const showQuickAccessInline = ref(true); // для панели быстрых действий
    const usersTableRows = ref(50);
    const departmentsTableRows = ref(20);
    const redirectsTableRows = ref(20);
    const actionsTableRows = ref(50);
    const actionCategoriesTableRows = ref(20);
    const actionTypesTableRows = ref(20);

    return {
      canSendReports,
      showSnow,
      showQuickAccessInline,
      usersTableRows,
      departmentsTableRows,
      redirectsTableRows,
      actionsTableRows,
      actionCategoriesTableRows,
      actionTypesTableRows,
    };
  },
  {
    persist: true, // для панели быстрых действий
  }
);
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.page-enter-active,
.page-leave-active {
  transition: all 0.2s; /* Плавный переход */
}
.page-enter-from,
.page-leave-to {
  opacity: 0; /* Начальная и конечная прозрачность */
  filter: blur(1rem); /* Размытие при переходе */
}
</style>

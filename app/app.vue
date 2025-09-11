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

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.1s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(25px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(0, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-25px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(25px, 0);
}

</style>

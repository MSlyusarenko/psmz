<template>
  <div
    :class="['main-bg h-screen-dynamic text-white flex flex-col items-center justify-center px-8 pt-10 pb-6 overflow-hidden', { 'fade-out': isLeaving }]"
    @transitionend="onTransitionEnd">
    <!-- Background -->
    <div class="fixed inset-0 overflow-hidden opacity-0 animate-fadein delay-600">
      <div class="bg-blob bg-teal opacity-50 bg-blur animation-blob-1"></div>
      <div class="bg-blob bg-primary opacity-50 bg-blur animation-blob-2"></div>
      <div class="bg-blob bg-purple opacity-50 bg-blur animation-blob-3"></div>
    </div>

    <div class="w-full max-w-[1280px] flex flex-col justify-between h-full min-h-[90vh] relative z-10">
      <!-- Header -->
      <header class="p-4 text-base text-gray-400 flex justify-center items-center">
        <div class="text-sm md:text-base  text-center opacity-0 animate-fadeinUp delay-1000">Пресс-служба <br
            class="md:hidden" /> Министерства
          здравоохранения</div>
      </header>

      <!-- Main -->
      <main class="flex flex-col items-center justify-center text-center px-4">
        <img src="/logo.svg" alt="Логотип" class="w-40 mb-6 object-contain opacity-0 animate-fadein delay-300" />

        <h1 class="text-3xl md:text-6xl font-bold opacity-0 animate-fadein delay-400">
          Мы скоро откроемся
        </h1>

        <div class="mt-6 md:mt-10 opacity-0 animate-fadein delay-800">
          <Button class="bt-main" @click="goToAuth">
            <div class="flex items-center">
              <span class="material-symbols-rounded mr-1.5">newspaper</span>
              <span class="font-bold">Панель управления</span>
            </div>
          </Button>
        </div>
      </main>

      <!-- Footer -->
      <footer
        class="p-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center text-center gap-2 opacity-0 animate-fadein delay-1000">
        <span>© MSlyusarenkoDev 2025</span>
        <span>Задизайнено и разработано <br class="md:hidden" /> MSlyusarenko совместно c Gizuzu с ❤️</span>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { useHead } from '#imports'
import { useSeoMeta } from '#imports'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLeaving = ref(false)

function goToAuth() {
  isLeaving.value = true
}

function onTransitionEnd() {
  if (isLeaving.value) {
    router.push('/auth')
  }
}

useHead({
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'theme-color', content: '#000000' },
    { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: light)' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'msapplication-navbutton-color', content: '#000000' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})
</script>

<style>
.main-bg {
  background-color: #000000;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.fade-out {
  background-color: #121212;
  opacity: 0;
}

/* Динамическая высота для мобильных устройств */
.h-screen-dynamic {
  height: 100vh;
  height: 100dvh;
  min-height: -webkit-fill-available;
}

/* Отлючение анимаций для мобильных */
@media (max-width: 768px) {
  .bg-blob {
    filter: blur(40px) !important;
    animation: none !important;
    opacity: 0.3 !important;
  }

  .animation-blob-1,
  .animation-blob-2,
  .animation-blob-3 {
    animation: none !important;
  }
}


/* Background */
.fixed {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-blob {
  position: absolute;
  width: 40vmax;
  height: 40vmax;
  border-radius: 50%;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  filter: blur(90px);
  opacity: 0.5;
}

@media (max-width: 768px) {
  .bg-blob {
    width: 60vmax;
    height: 60vmax;
    filter: blur(70px);
  }
}

.bg-teal {
  background-color: #ff4b32;
}

.bg-primary {
  background-color: #ff634f;
}

.bg-purple {
  background-color: #a52a19;
}

.animation-blob-1 {
  top: 20%;
  left: 10%;
  animation-name: move-blob-1;
}

.animation-blob-2 {
  top: 60%;
  left: 70%;
  animation-name: move-blob-2;
}

.animation-blob-3 {
  top: 40%;
  left: 40%;
  animation-name: move-blob-3;
}

@keyframes move-blob-1 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-15vmax, 10vmax);
  }

  50% {
    transform: translate(-30vmax, -30vmax);
  }

  75% {
    transform: translate(-8vmax, -5vmax);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes move-blob-2 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(7vmax, -10vmax);
    width: 40vmax;
    height: 40vmax;
  }

  50% {
    transform: translate(-12vmax, -28vmax);
    width: 45vmax;
    height: 45vmax;
  }

  75% {
    transform: translate(-10vmax, -15vmax);
    width: 40vmax;
    height: 40vmax;
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes move-blob-3 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-12vmax, 10vmax);
    width: 40vmax;
    height: 40vmax;
  }

  50% {
    transform: translate(-30vmax, -16vmax);
    width: 50vmax;
    height: 50vmax;
  }

  75% {
    transform: translate(-10vmax, -20vmax);
    width: 40vmax;
    height: 40vmax;
  }

  100% {
    transform: translate(0, 0);
  }
}

/* Link-vk animation */
.link-vk {
  position: relative;
  color: #7494df;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 400;
  display: inline-block;
  transition:
    color 0.4s ease,
    transform 0.4s ease,
    letter-spacing 0.4s ease,
    font-weight 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.link-vk:hover {
  color: #ffffff;
  transform: translateY(-3px);
  font-weight: 600;
  /* Semi-bold */
  letter-spacing: 0.5px;
}

.link-vk::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  /* Start from center */
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateX(-50%);
  /* Center the gradient */
  border-radius: 2px;
}

.link-vk:hover::after {
  width: 100%;
  /* Full width on hover */
  left: 50%;
  /* Keep centered */
}

/* Existing animations */
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeinUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadein {
  animation: fadein 1s ease forwards;
}

.animate-fadeinUp {
  animation: fadeinUp 1s ease forwards;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-800 {
  animation-delay: 0.8s;
}

.delay-900 {
  animation-delay: 0.9s;
}

.delay-1000 {
  animation-delay: 1.0s;
}
</style>
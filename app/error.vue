<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const error = useError()

const goToMain = () => {
    router.push('/')
}
</script>

<template>
        <div class="error-page items-center justify-center text-center">
            <template v-if="error.statusCode === 404">
                <h1 class="text-3xl md:text-6xl font-bold">404</h1>
                <h2 class="text-2xl md:text-4xl font-bold mt-2 md:mt-4">Такой страницы нет 🙃</h2>
            </template>
            <template v-else>
                <h1 class="text-3xl md:text-6xl font-bold mt-2 md:mt-4">Произошла ошибка ({{ error.statusCode }})</h1>
            </template>
            <p v-if="error.message" class="text-xl md:text-2xl mt-2 md:mt-4">{{ error.message }}</p>
        </div>

        <div class="mt-2 md:mt-4 items-center justify-center text-center">
            <!-- <Button class="bt-main" @click="goToAuth">
                        <div class="flex items-center">
                            <span class="material-symbols-rounded mr-1.5">newspaper</span>
                            <span class="font-bold">На главную</span>
                        </div>
                    </Button> -->
            <Button class="bt-main font-bold" @click="goToMain">
                <div class="flex items-center">
                    <img src="/psmz_logo_white.svg" alt="PSMZ Logo" class="custom-icon mr-1.5" />
                    <span class="font-bold">На главную</span>
                </div>
            </Button>
        </div>
</template>

<style scoped>
.error-page {
    text-align: center;
    padding: 48px;
}
</style>
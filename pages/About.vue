<template>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Topbar from '~/components/Topbar.vue';
import { useRouter } from 'vue-router';

useSeoMeta({
title: 'Создание приказов',
ogTitle: 'Создание приказов',
description: 'Автоматическое создание приказов',
ogDescription: 'Автоматическое создание приказов',
})

</script>
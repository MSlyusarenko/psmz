<template>
    <div class="gradient-background"></div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    25% { background-position: 50% 0%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 100%; }
    100% { background-position: 0% 50%; }
  }
  
  .gradient-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: #121212;

    background-size: 200% 200%;
    animation: gradient-animation 15s ease infinite;
  }
  </style>
  
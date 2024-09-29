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
    background: radial-gradient(circle at 20% 30%, #ff7e5f, #feb47b, #86e3ce, #d4a5a5, #9b59b6, #3498db, #2ecc71, #e74c3c);
    background-size: 200% 200%;
    animation: gradient-animation 15s ease infinite;
  }
  </style>
  
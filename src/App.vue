<script setup>
import HomeView from './components/HomeView.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <main class="app-container">
    <HomeView />
  </main>
  <AppFooter />
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-container {
  flex: 1;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  font-family: 'Work Sans', sans-serif;
}
</style>

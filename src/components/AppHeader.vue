<script setup>
import SearchBar from './SearchBar.vue'

const emit = defineEmits(['search'])
const onSearch = (query) => {
  emit('search', query)
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1>TV TONIGHT</h1>
      </div>
      <SearchBar @search="onSearch" />
    </div>
    <div class="tagline">&ndash; What are you in the mood for? &ndash;</div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #f0f8ff;
  color: #121212;
  padding: 1rem 5%;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo h1 {
  font-family: 'Century Gothic', 'Futura', sans-serif;
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 500;
  letter-spacing: 0.2rem;
  margin: 0;
  color: #121212;
  white-space: nowrap;
}

.tagline {
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  font-family: 'Georgia', 'Palatino', serif;
  font-style: italic;
  font-size: clamp(0.9rem, 4vw, 1.3rem);
  color: #5f7d95;
  letter-spacing: 0.05rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}
</script>

<template>
  <div class="search-container">
    <div class="search-pill">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a show..."
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  flex: 1;
}

.search-pill {
  display: flex;
  background-color: white;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid #ccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 45px;
  width: 100%;
  max-width: 500px;
}

input {
  border: none;
  padding: 0 20px;
  font-size: 1.1rem;
  flex: 1;
  outline: none;
  color: #333;
}

input::placeholder {
  color: #bbb;
}

button {
  border: none;
  padding: 0 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

button:hover {
  opacity: 0.8;
}

button svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .search-container {
    margin: 1rem 0;
    max-width: 100%;
  }
}
</style>

<script setup>
defineProps({
  title: String,
  shows: Array,
})

const emit = defineEmits(['select-show'])
</script>

<template>
  <section class="carousel-container">
    <h3 class="genre-title">{{ title }}</h3>

    <div class="carousel-track">
      <div
        v-for="show in shows"
        :key="show.id"
        class="show-card"
        @click="emit('select-show', show)"
      >
        <div class="poster-wrapper">
          <img v-if="show.image" :src="show.image.medium" :alt="show.name" loading="lazy" />
          <div v-else class="no-image">No Image</div>

          <div class="rating-badge">&#9733; {{ show.rating?.average || 'N/A' }}</div>
        </div>
        <p class="show-name">{{ show.name }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-container {
  padding: 1rem 5% 0;
  background-color: #1e1e1e;
}

.genre-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Century Gothic', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #007bff transparent;
}

.carousel-track::-webkit-scrollbar {
  height: 6px;
}
.carousel-track::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}

.show-card {
  flex: 0 0 180px;
  cursor: pointer;
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2 / 3;
  background-color: #222;
  border-radius: 8px;
  overflow: hidden;
}

.poster-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rating-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.show-name {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

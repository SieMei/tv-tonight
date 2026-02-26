<script setup>
defineProps({
  show: {
    type: Object,
    required: true,
  },
  backgroundOverride: {
    type: String,
    default: null,
  },
})
const emit = defineEmits(['view-details'])
</script>
<template>
  <section
    class="featured-container"
    :style="{ backgroundImage: `url(${backgroundOverride || show.image?.original})` }"
  >
    <div class="content-overlay">
      <div class="text-content">
        <span class="recommendation-tag">EDITOR'S PICK</span>
        <h1 class="title">{{ show.name }}</h1>
        <div class="meta">
          <span> &#9733; {{ show.rating?.average || 'N/A' }}</span>
          <span>{{ show.genres?.join(' • ') }}</span>
        </div>
        <div class="summary" v-html="show.summary"></div>
        <button class="info-button" @click="emit('view-details')">More info</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-container {
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center top;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.content-overlay {
  width: 100%;
  height: 100%;
  background: rgba(27, 26, 26, 0.5);

  display: flex;
  align-items: flex-end;
  padding: 4rem 5%;
}

.text-content {
  max-width: 700px;
}

.recommendation-tag {
  display: inline-block;
  background-color: #5f7d95;
  color: white;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 2px;
  margin-bottom: 1.6rem;
}

.title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.meta {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

.summary {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #dddddd;
  margin-bottom: 2rem;
}

.info-button {
  background-color: #ffffff;
  color: #121212;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Object,
    default: null,
    required: true,
  },
})

const emit = defineEmits(['close'])

const cast = computed(() => {
  return (props.show?._embedded?.cast || props.show?.cast || []).slice(0, 5)
})
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="emit('close')">&times;</button>

      <div class="modal-body">
        <div class="poster-container">
          <img :src="show.image?.original || show.image?.medium" :alt="show.name" />
        </div>

        <div class="details-container">
          <h2>{{ show.name }}</h2>
          <div class="meta">
            <span class="rating"> &#9733; {{ show.rating?.average || 'N/A' }}</span>
            <span class="runtime" v-if="show.runtime">{{ show.runtime }} min</span>
          </div>

          <div class="genres">
            <span v-for="genre in show.genres" :key="genre" class="genre-tag">
              {{ genre }}
            </span>
          </div>

          <div class="summary" v-html="show.summary"></div>

          <div class="cast-section" v-if="cast.length">
            <h3>Main cast</h3>
            <div class="cast-list">
              <div v-for="member in cast" :key="member.person.id" class="cast-member">
                <span class="actor-name">{{ member.person.name }}</span>
                <span class="character-name" v-if="member.character?.name">
                  as {{ member.character.name }}</span
                >
              </div>
            </div>
          </div>

          <div class="extra-info">
            <p><strong>Number of episodes:</strong> {{ show.episodeCount ?? 'N/A' }}</p>
            <p v-if="show.network"><strong>Network:</strong> {{ show.network.name }}</p>
            <p v-if="show.premiered"><strong>Premiered:</strong> {{ show.premiered }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background-color: #1a1a1a;
  color: white;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 12px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 10;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  padding: 40px;
}

.poster-container img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

h2 {
  font-size: 2.5rem;
  margin-top: 0;
}

.meta {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  color: #bbb;
}

.genre-tag {
  background: #333;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-right: 8px;
}

.summary {
  line-height: 1.6;
  color: #ddd;
  margin: 20px 0;
}

.cast-section {
  margin-bottom: 20px;
}

.cast-section h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #fff;
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cast-member {
  background: #333;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.character-name {
  color: #bbb;
}

.extra-info p {
  margin: 5px 0;
  color: #999;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 80vh;
  }
  .modal-body {
    grid-template-columns: 1fr;
    padding: 20px;
    padding-bottom: 60px;
    gap: 20px;
  }
  .poster-container {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>

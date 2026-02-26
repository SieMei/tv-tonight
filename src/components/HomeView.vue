<script setup>
import { ref, onMounted } from 'vue'
import { tvService } from '@/services/tvmaze.js'
import FeaturedShow from './FeaturedShow.vue'
import AppHeader from './AppHeader.vue'
import ShowCarousel from './ShowCarousel.vue'
import ShowModal from './ShowModal.vue'

const featuredShow = ref(null)
const showsByGenre = ref({})
const isLoading = ref(true)
const error = ref(null)
const featuredBg = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const hasSearched = ref(false)
const currentQuery = ref('')
const selectedShow = ref(null)

const handleSearch = async (query) => {
  if (!query) return
  try {
    isSearching.value = true
    hasSearched.value = true
    currentQuery.value = query
    const results = await tvService.searchShows(query)
    searchResults.value = results
    console.log('Search results found:', results)
  } catch (err) {
    console.error('Search failed:', err)
    error.value = 'Sorry, something went wrong with your search. Please try again.'
  } finally {
    isSearching.value = false
  }
}

const clearSearch = () => {
  searchResults.value = []
  hasSearched.value = false
  currentQuery.value = ''
}

const openModal = async (show) => {
  const [fullDetails, episodes] = await Promise.all([
    tvService.getShowWithCast(show.id),
    tvService.getEpisodesByShowId(show.id),
  ])

  selectedShow.value = { ...fullDetails, episodeCount: episodes.length }
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedShow.value = null
  document.body.style.overflow = ''
}

const loadDashboardData = async () => {
  try {
    isLoading.value = true
    const genresToFetch = ['Drama', 'Comedy', 'Crime', 'Action', 'Science-Fiction']
    const genreData = await tvService.getShowsByMultipleGenres(genresToFetch, 10)
    showsByGenre.value = genreData
    featuredShow.value = await tvService.getShowWithCast(86175)
    featuredBg.value = 'https://static.tvmaze.com/uploads/images/original_untouched/597/1493120.jpg'
  } catch (err) {
    console.error('Failed to load data:', err)
    error.value = "Sorry, we couldn't load any shows. Please try again later."
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>

<template>
  <div class="home-dashboard">
    <div v-if="isLoading" class="loading-state">Loading...</div>

    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <div v-else class="dashboard-content">
      <AppHeader @search="handleSearch" />

      <div v-if="isSearching" class="search-status">
        <p>Searching for "{{ currentQuery }}"...</p>
      </div>

      <div v-else-if="hasSearched" class="search-results-area">
        <div class="search-header">
          <h3>Results for "{{ currentQuery }}"</h3>
          <button class="close-btn" @click="clearSearch">&times;</button>
        </div>

        <div v-if="searchResults.length > 0" class="search-list">
          <div
            v-for="show in searchResults"
            :key="show.id"
            class="search-item"
            @click="openModal(show)"
          >
            <div class="result-thumbnail">
              <img v-if="show.image" :src="show.image.medium" :alt="show.name" loading="lazy" />
              <div v-else class="no-thumb">N/A</div>
            </div>

            <div class="result-text">
              <span class="result-title">{{ show.name }}</span>
              <span class="result-year" v-if="show.premiered">
                ({{ new Date(show.premiered).getFullYear() }})
              </span>
            </div>
          </div>
        </div>

        <div v-else class="no-results">
          <p>No titles found for "{{ currentQuery }}".</p>
        </div>

        <hr class="section-divider" />
      </div>

      <FeaturedShow
        v-if="featuredShow"
        :show="featuredShow"
        :background-override="featuredBg"
        @view-details="openModal(featuredShow)"
      />

      <div class="genre-lists">
        <ShowCarousel
          v-for="(shows, genre) in showsByGenre"
          :key="genre"
          :title="genre"
          :shows="shows"
          @select-show="openModal"
        />
      </div>
    </div>
  </div>

  <ShowModal :show="selectedShow" @close="closeModal" />
</template>

<style scoped>
.home-dashboard {
  padding-bottom: 2rem;
}
.loading-state,
.error-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}
.error-state {
  color: #ff6b6b;
}
.dashboard-content {
  position: relative;
}

.search-status,
.no-results {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #e0e0e0;
}

.search-results-area {
  position: absolute;
  width: 100%;
  z-index: 100;
  padding: 2rem 0;
  background-color: #0a0a0a;
  border-bottom: 2px solid #333;
}

.search-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
}

.search-item {
  padding: 8px 15px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: background-color 0.2s;
}

.search-item:hover {
  background-color: #252525;
}

.result-thumbnail {
  width: 60px;
  height: 84px;
  background-color: #222;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-thumb {
  font-size: 0.7rem;
  color: #555;
  font-weight: bold;
}

.result-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-header {
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  margin: 0 auto 1.5rem auto;
}

.search-header h3 {
  font-family: 'Century Gothic', 'Futura', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
}

.section-divider {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, transparent, #333, transparent);
  margin: 3rem 0;
}
</style>

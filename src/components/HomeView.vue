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
  try {
    const fullDetails = await tvService.getShowWithCast(show.id)
    selectedShow.value = fullDetails
    // Prevent the background from scrolling while modal is open
    document.body.style.overflow = 'hidden'
  } catch (err) {
    console.error('Could not fetch details', err)
  }
}
const closeModal = () => {
  selectedShow.value = null
  document.body.style.overflow = 'auto'
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
      <FeaturedShow
        v-if="featuredShow"
        :show="featuredShow"
        :background-override="featuredBg"
        @view-details="openModal(featuredShow)"
      />
    </div>

    <div v-if="isSearching" class="search-status">
      <p>Searching for "{{ currentQuery }}"...</p>
    </div>

    <div v-else-if="hasSearched" class="search-results-area">
      <div class="search-header">
        <h3>Results for "{{ currentQuery }}"</h3>
        <button class="clear-btn" @click="clearSearch">Clear Search</button>
      </div>

      <ShowCarousel
        v-if="searchResults.length > 0"
        title=""
        :shows="searchResults"
        @select-show="openModal"
      />

      <div v-else class="no-results">
        <p>Sorry, we couldn't find any TV shows matching that name.</p>
      </div>

      <hr class="section-divider" />
    </div>

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

  <ShowModal :show="selectedShow" @close="closeModal" />
</template>

<style scoped>
.home-dashboard {
  padding-bottom: 50px;
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

.search-status,
.no-results {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #e0e0e0;
}

.search-results-area {
  padding-top: 2rem;
  background-color: #1a1a1a; /* Slightly lighter dark background to make it stand out */
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  margin-bottom: 1rem;
}

.search-header h3 {
  font-family: 'Century Gothic', 'Futura', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0;
}

.clear-btn {
  background-color: #ff4757;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.clear-btn:hover {
  background-color: #ff6b81;
}

.section-divider {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, transparent, #333, transparent);
  margin: 2rem 0;
}
</style>

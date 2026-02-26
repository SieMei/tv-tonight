const BASE_URL = 'https://api.tvmaze.com'

// Helper function to make API calls and handle errors
async function fetchFromApi(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`TVmaze API error: ${response.status}`)
  }
  return response.json()
}

// Methods for fetching shows, searching shows and get show details
export const tvService = {
  async getShows(page = 0) {
    return fetchFromApi(`/shows?page=${page}`)
  },

  async searchShows(query) {
    const results = await fetchFromApi(`/search/shows?q=${encodeURIComponent(query)}`)
    return results.map((result) => result.show)
  },

  async getShowWithCast(id) {
    return fetchFromApi(`/shows/${id}?embed[]=cast&embed[]=episodes`)
  },

  async getEpisodesByShowId(id) {
    return fetchFromApi(`/shows/${id}/episodes`)
  },

  // Methods for filtering shows by genre and status
  async getShowsByGenre(genre, limit = 12) {
    const shows = await this.getShows(0)
    return shows
      .filter((show) => show.genres?.includes(genre))
      .filter((show) => show.rating?.average)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, limit)
  },
  async getShowsByType(type, limit = 12) {
    const shows = await this.getShows(0)
    return shows
      .filter((show) => show.type === type)
      .filter((show) => show.rating?.average)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, limit)
  },

  async getShowsByMultipleGenres(genres, showsPerGenre = 12) {
    const shows = await this.getShows(0)
    const result = {}

    genres.forEach((genre) => {
      result[genre] = shows
        .filter((show) => show.genres?.includes(genre))
        .filter((show) => show.rating?.average)
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, showsPerGenre)
    })

    return result
  },

  async getRunningShows(limit = 20) {
    const shows = await this.getShows(0)
    return shows
      .filter((show) => show.status === 'Running')
      .filter((show) => show.rating?.average)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, limit)
  },
}

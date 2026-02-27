import { describe, test, expect, vi, beforeEach } from 'vitest'
import { tvService } from './tvmaze'

describe('tvService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('fetch shows with correct URL', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Test Show' }]),
      }),
    )

    const result = await tvService.getShows(2)

    expect(globalThis.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=2')
    expect(result).toEqual([{ id: 1, name: 'Test Show' }])
  })

  test('return only show object from search results', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ score: 10, show: { id: 1, name: 'Lost' } }]),
      }),
    )

    const result = await tvService.searchShows('lost')

    expect(result).toEqual([{ id: 1, name: 'Lost' }])
  })

  test('throw error when response is not ok', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    )

    await expect(tvService.getShows()).rejects.toThrow('TVmaze API error: 500')
  })

  test('fetch show with cast and episodes', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            name: 'Breaking Bad',
            _embedded: {
              cast: [{ person: { name: 'Bryan Cranston' } }],
              episodes: [{ id: 1, name: 'Pilot' }],
            },
          }),
      }),
    )

    const result = await tvService.getShowWithCast(1)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.tvmaze.com/shows/1?embed[]=cast&embed[]=episodes',
    )
    expect(result.name).toBe('Breaking Bad')
    expect(result._embedded.cast).toHaveLength(1)
    expect(result._embedded.episodes).toHaveLength(1)
  })

  test('return only shows matching the genre and sort by rating', async () => {
    const mockShows = [
      { id: 1, name: 'Show A', genres: ['Drama', 'Crime'], rating: { average: 8.5 } },
      { id: 2, name: 'Show B', genres: ['Comedy'], rating: { average: 7.2 } },
      { id: 3, name: 'Show C', genres: ['Drama'], rating: { average: 9.1 } },
      { id: 4, name: 'Show D', genres: ['Drama'], rating: { average: null } },
    ]

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockShows),
      }),
    )

    const result = await tvService.getShowsByGenre('Drama', 10)

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Show C')
    expect(result[1].name).toBe('Show A')
    expect(result.some((show) => show.id === 4)).toBe(false)
  })

  test('limit number of returned running shows', async () => {
    const mockShows = [
      { id: 1, name: 'Show A', genres: ['Drama'], rating: { average: 9.0 } },
      { id: 2, name: 'Show B', genres: ['Drama'], rating: { average: 8.5 } },
      { id: 3, name: 'Show C', genres: ['Drama'], rating: { average: 8.0 } },
    ]

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockShows),
      }),
    )

    const result = await tvService.getShowsByGenre('Drama', 2)

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Show A')
    expect(result[1].name).toBe('Show B')
  })

  test('fetch shows for multiple genres at once', async () => {
    const mockShows = [
      { id: 1, name: 'Drama Show', genres: ['Drama'], rating: { average: 9.0 } },
      { id: 2, name: 'Comedy Show', genres: ['Comedy'], rating: { average: 8.5 } },
      { id: 3, name: 'Action Show', genres: ['Action'], rating: { average: 8.0 } },
    ]

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockShows),
      }),
    )

    const result = await tvService.getShowsByMultipleGenres(['Drama', 'Comedy'], 10)

    expect(result).toHaveProperty('Drama')
    expect(result).toHaveProperty('Comedy')
    expect(result.Drama).toHaveLength(1)
    expect(result.Comedy).toHaveLength(1)
    expect(result.Drama[0].name).toBe('Drama Show')
    expect(result.Comedy[0].name).toBe('Comedy Show')
  })

  test('return empty arrays for genres with no matches', async () => {
    const mockShows = [{ id: 1, name: 'Drama Show', genres: ['Drama'], rating: { average: 9.0 } }]

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockShows),
      }),
    )

    const result = await tvService.getShowsByMultipleGenres(['Drama', 'Horror'], 10)

    expect(result.Drama).toHaveLength(1)
    expect(result.Horror).toHaveLength(0)
  })

  test('skip shows without genres during genre filtering', async () => {
    const mockShows = [
      { id: 1, name: 'Show Without Genres', rating: { average: 8.0 } },
      { id: 2, name: 'Drama Show', genres: ['Drama'], rating: { average: 9.0 } },
    ]

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockShows),
      }),
    )

    const result = await tvService.getShowsByGenre('Drama', 10)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Drama Show')
  })

  test('encode special characters in search query', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    )

    await tvService.searchShows('breaking bad & better call saul')

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('breaking%20bad%20%26%20better%20call%20saul'),
    )
  })
})

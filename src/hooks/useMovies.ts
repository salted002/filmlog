import { useEffect, useState } from 'react'
import type { MovieDetail, MovieSummary } from '../types'
import {
  getFavoriteMovies,
  getMovieDetail,
  searchMovies,
} from '../lib/api/tmdb'

export const useFavoriteMovies = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    // 아래부분 setState() 에러
    // setLoading(true)
    // setError(null)
    getFavoriteMovies()
      .then((data) => {
        if (alive) setMovies(data)
      })
      .catch((error) => {
        if (alive) setError(error.message)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])
  return { movies, loading, error }
}

export const useSearchMovies = (query: string, page: number) => {
  const [movies, setMovies] = useState<MovieSummary[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    const fetchMovies = async () => {
      if (!query) {
        if (alive) {
          setMovies([])
          setLoading(false)
        }
        return
      }
      try {
        const data = await searchMovies(query, page)
        if (alive) {
          setMovies(data.results)
          setTotalPages(data.total_pages)
          setTotalResults(data.total_results)
        }
      } catch (error) {
        if (alive) setError((error as Error).message)
      } finally {
        if (alive) setLoading(false)
      }
    }

    fetchMovies()

    return () => {
      alive = false
    }
  }, [page, query])
  return { movies, totalPages, totalResults, loading, error }
}

export const useMovieDetail = (id: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    getMovieDetail(id)
      .then((data) => {
        if (alive) setMovie(data)
      })
      .catch((error) => {
        if (alive) setError((error as Error).message)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [id])
  return { movie, loading, error }
}

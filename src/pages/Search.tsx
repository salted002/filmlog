import { useEffect, useState } from 'react'
import { useSearchMovies } from '../hooks/useMovies'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [page, setPage] = useState(1)
  const [prevQuery, setPrevQuery] = useState(query)

  const { movies, totalPages, totalResults, loading, error } = useSearchMovies(
    query,
    page,
  )

  // 검색어가 바뀌면 페이지=1로 초기화
  if (query !== prevQuery) {
    setPrevQuery(query)
    setPage(1)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  if (loading) return <div className="page status">로딩중...</div>
  if (error) return <div className="page status error-text">에러: {error}</div>

  return (
    <div className="page">
      {query && (
        <p className="search-result-count">
          <strong>{query}</strong> 검색 결과 {totalResults}개
        </p>
      )}

      {movies.length === 0 ? (
        <div className="status">검색 결과가 없어요.</div>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="secondary"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                이전
              </button>
              <span className="pagination-info">
                {page} / {totalPages}
              </span>
              <button
                className="secondary"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

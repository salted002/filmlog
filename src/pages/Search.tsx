import { useState } from 'react'
import { useSearchMovies } from '../hooks/useMovies'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
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

  return (
    <div>
      <SearchBar />
      {loading && <div>로딩중...</div>}
      {error && <div>에러: {error}</div>}

      <span>검색 결과: {totalResults}개</span>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 페이지네이션 코드 */}
      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          다음
        </button>
      </div>
    </div>
  )
}

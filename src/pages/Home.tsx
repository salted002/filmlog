import MovieCard from '../components/MovieCard'
import { useFavoriteMovies } from '../hooks/useMovies'

export default function Home() {
  const { movies, loading, error } = useFavoriteMovies()
  return (
    <div>
      {loading ? (
        <div>스피너 여기에</div>
      ) : error ? (
        <div>에러박스 여기에</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

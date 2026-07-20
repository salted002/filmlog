import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import { useFavoriteMovies } from '../hooks/useMovies'

export default function Home() {
  const { movies, loading, error } = useFavoriteMovies()
  return (
    <div>
      <SearchBar />
      {loading ? (
        <div>스피너 여기에</div>
      ) : error ? (
        <div>에러박스 여기에</div>
      ) : (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  )
}

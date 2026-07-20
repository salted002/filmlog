import { useParams } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovies'
import { getPosterUrl } from '../lib/api/tmdb'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { movie, loading, error } = useMovieDetail(Number(id))

  const director = movie?.credits.crew.find(
    (person) => person.job === 'Director',
  )

  if (loading) return <div>스피너</div>
  if (error) return <div>에러박스</div>
  if (!movie) {
    return <div>영화를 찾을 수 없습니다.</div>
  }

  return (
    <div>
      <h3>{movie.title}</h3>
      <img
        src={getPosterUrl(movie.poster_path, 500) ?? undefined}
        alt={movie.title}
      />
      <div>{movie.overview}</div>
      <div>
        {movie.genres?.map((genre) => {
          return <div key={genre.id}>{genre.name}</div>
        })}
      </div>
      <div>{movie.runtime}</div>
      <div>
        {movie.production_countries.map((ctr) => {
          return <span key={ctr.iso_3166_1}>{ctr.name}</span>
        })}
      </div>
      <div>{director ? director.name : '정보가 없습니다.'}</div>

      <div>{movie.release_date}</div>
      <div>{movie.vote_average.toFixed(1)}</div>
    </div>
  )
}

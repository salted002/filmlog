import { Link } from 'react-router-dom'
import { getPosterUrl } from '../lib/api/tmdb'
import type { MovieSummary } from '../types'

type MovieCardProps = {
  movie: MovieSummary
}

export default function MovieCard({ movie }: MovieCardProps) {
  // 이미지 URL 가공하기
  const posterUrl = getPosterUrl(movie.poster_path, 200)

  // 평균 별점값 소수점 통일하기
  const rating = movie.vote_average.toFixed(1)

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={posterUrl ?? undefined} alt={movie.title} />
      <div className="info">
        <h3>{movie.title}</h3>
        <p className="meta">{movie.release_date}</p>
        <p className="meta">⭐ {rating}</p>
      </div>
    </Link>
  )
}

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
    <Link to={`/movie/${movie.id}`}>
      <div>
        <h3>{movie.title}</h3>
        <p>개봉일: {movie.release_date}</p>
        <p>평균 별점: {rating}</p>

        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} />
        ) : (
          <div>이미지 없음</div>
        )}
      </div>
    </Link>
  )
}

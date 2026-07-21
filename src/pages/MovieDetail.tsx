import { useNavigate, useParams } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovies'
import { getPosterUrl } from '../lib/api/tmdb'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import WatchedModal from '../components/WatchedModal'
import { useWish } from '../hooks/useWish'
export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { movie, loading, error } = useMovieDetail(Number(id))
  const { wish, addWish, removeWish } = useWish()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  // loading, error 체크를 movie 체크보다 먼저!
  if (loading) return <div className="page status">스피너</div>
  if (error) return <div className="page status error-text">에러박스</div>
  if (!movie) return <div className="page status">영화를 찾을 수 없습니다.</div>

  const director = movie.credits.crew.find(
    (person) => person.job === 'Director',
  )
  const wishedItem = wish.find((item) => item.movie_id === movie.id)

  const handleWishClick = async () => {
    if (!user) {
      navigate('/signin')
      return
    }
    if (wishedItem) {
      await removeWish(wishedItem.id)
    } else {
      await addWish({
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })
    }
  }

  return (
    <div className="page">
      <div className="detail-hero">
        <img
          className="detail-poster"
          src={getPosterUrl(movie.poster_path, 500) ?? undefined}
          alt={movie.title}
        />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span>{movie.release_date}</span>
            <span>·</span>
            <span>{movie.runtime}분</span>
            <span>·</span>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>

          <div className="detail-genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <button
              onClick={handleWishClick}
              className={wishedItem ? 'secondary' : ''}
            >
              {wishedItem ? '보고싶어요 취소' : '보고싶어요'}
            </button>
            <button
              className="secondary"
              onClick={() => {
                if (!user) {
                  navigate('/signin')
                  return
                }
                setIsModalOpen(true)
              }}
            >
              봤어요
            </button>
          </div>

          <p className="detail-overview">{movie.overview}</p>

          <div className="detail-sub">
            <div>
              <span className="label">감독</span>{' '}
              {director ? director.name : '정보 없음'}
            </div>
            <div>
              <span className="label">제작국가</span>
              {movie.production_countries.map((ctr) => ctr.name).join(', ')}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <WatchedModal movie={movie} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

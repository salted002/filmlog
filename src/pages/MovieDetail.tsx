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
  // 추가 모달 창을 위한 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  // 감독이 있을 경우 이름 가져오기
  const director = movie?.credits.crew.find(
    (person) => person.job === 'Director',
  )
  if (!movie) {
    return <div>영화를 찾을 수 없습니다.</div>
  }
  // 영화가 wish 목록에 있는지 확인
  const wishedItem = wish.find((item) => item.movie_id === movie.id)

  const handleWishClick = async () => {
    if (!user) {
      navigate('/signin')
      return
    }
    if (wishedItem) {
      await removeWish(wishedItem.id)
    } else {
      addWish({
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })
    }
  }

  if (loading) return <div>스피너</div>
  if (error) return <div>에러박스</div>

  return (
    <div>
      <h3>{movie.title}</h3>
      <img
        src={getPosterUrl(movie.poster_path, 500) ?? undefined}
        alt={movie.title}
      />
      <button onClick={handleWishClick}>
        {wishedItem ? '보고싶어요 취소' : '보고싶어요'}
      </button>
      <button
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
      {isModalOpen && (
        <WatchedModal movie={movie} onClose={() => setIsModalOpen(false)} />
      )}
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

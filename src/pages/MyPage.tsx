import { Link, useSearchParams } from 'react-router-dom'
import { useWatched } from '../hooks/useWatched'
import { useWish } from '../hooks/useWish'
import { getPosterUrl } from '../lib/api/tmdb'

export default function MyPage() {
  const { watched, removeWatched } = useWatched()
  const { wish, removeWish } = useWish()

  // 탭 구분 위한 파라미터
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') ?? 'watched' // 기본값은 watched

  return (
    <div>
      <div>
        <button onClick={() => setSearchParams({ tab: 'watched' })}>
          본 영화 {watched.length}
        </button>
        <button onClick={() => setSearchParams({ tab: 'wish' })}>
          보고싶어요 {wish.length}
        </button>
      </div>

      {/* watched 본 영화 탭 */}
      {activeTab === 'watched' && (
        <div>
          {watched.length === 0 ? (
            <div>아직 본 영화가 없어요.</div>
          ) : (
            <div>
              {watched.map((movie) => (
                <div key={movie.id}>
                  <Link to={`/movie/${movie.movie_id}`}>
                    <h3>{movie.title}</h3>
                    <img
                      src={getPosterUrl(movie.poster_path, 200) ?? undefined}
                      alt={movie.title}
                    />
                  </Link>
                  {movie.user_rating && <div>내 별점: {movie.user_rating}</div>}
                  {movie.watched_date && <div>{movie.watched_date}</div>}
                  {movie.comment && <div>{movie.comment}</div>}
                  <button onClick={() => removeWatched(movie.id)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* wish 보고싶어요 영화 탭 */}
      {activeTab === 'wish' && (
        <div>
          {wish.length === 0 ? (
            <div>아직 보고싶은 영화가 없어요.</div>
          ) : (
            <div>
              {wish.map((movie) => (
                <div key={movie.id}>
                  <Link to={`/movie/${movie.movie_id}`}>
                    <h3>{movie.title}</h3>
                    <img
                      src={getPosterUrl(movie.poster_path, 200) ?? undefined}
                      alt={movie.title}
                    />
                  </Link>
                  <button onClick={() => removeWish(movie.id)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

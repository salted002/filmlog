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
      <div className="tabs">
        <button
          onClick={() => setSearchParams({ tab: 'watched' })}
          className={activeTab === 'watched' ? 'active' : ''}
        >
          본 영화 {watched.length}
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'wish' })}
          className={activeTab === 'wish' ? 'active' : ''}
        >
          보고싶어요 {wish.length}
        </button>
      </div>

      {/* watched 본 영화 탭 */}
      {activeTab === 'watched' && (
        <div className="movie-grid">
          {watched.map((movie) => (
            <div key={movie.id} className="movie-card watched-card">
              <Link to={`/movie/${movie.movie_id}`}>
                <img
                  src={getPosterUrl(movie.poster_path, 200) ?? undefined}
                  alt={movie.title}
                />
              </Link>
              <div className="info">
                <h3>{movie.title}</h3>
                {movie.user_rating !== null && (
                  <p className="meta">⭐ {movie.user_rating}</p>
                )}
                {movie.watched_date && (
                  <p className="meta">{movie.watched_date}</p>
                )}
                {movie.comment && <p className="comment">{movie.comment}</p>}
                <button
                  className="secondary remove-btn"
                  onClick={() => removeWatched(movie.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* wish 보고싶어요 영화 탭 */}
      {activeTab === 'wish' && (
        <div className="movie-grid">
          {wish.length === 0 ? (
            <div>아직 보고싶은 영화가 없어요.</div>
          ) : (
            <div>
              {wish.map((movie) => (
                <div key={movie.id} className="movie-card watched-card">
                  <Link to={`/movie/${movie.movie_id}`}>
                    <img
                      src={getPosterUrl(movie.poster_path, 200) ?? undefined}
                      alt={movie.title}
                    />
                  </Link>
                  <div className="info">
                    <h3>{movie.title}</h3>
                    <button
                      className="secondary remove-btn"
                      onClick={() => removeWish(movie.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

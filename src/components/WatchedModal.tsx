import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useWatched } from '../hooks/useWatched'
import type { MovieDetail } from '../types'
import StarRating from './StarRating'

type WatchedModalProps = {
  movie: MovieDetail
  onClose: () => void
}

export default function WatchedModal({ movie, onClose }: WatchedModalProps) {
  const { addWatched } = useWatched()
  const { user } = useAuth()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [watchedDate, setWatchedDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return // 이론상 로그인한 사람만 여기까지 오지만, 방어적으로.

    setSubmitting(true)
    setError(null)
    try {
      await addWatched({
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        user_rating: rating,
        comment: comment,
        watched_date: watchedDate,
      })
      onClose() // 저장이 끝나면 모달을 닫는다.
    } catch {
      setError('저장에 실패했습니다.')
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{movie.title}</h3>
        <p className="modal-subtitle">이 영화를 언제, 어떻게 보셨나요?</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="rating">별점</label>
          <StarRating rating={rating} onChange={setRating} />
          <span className="rating-value">{rating.toFixed(1)} / 10</span>
          <label htmlFor="comment">감상평</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <label htmlFor="watchedDate">감상한 날</label>
          <input
            id="watchedDate"
            type="date"
            value={watchedDate}
            onChange={(e) => setWatchedDate(e.target.value)}
          />

          {error && <div className="error-text">{error}</div>}

          <div className="modal-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? '저장 중...' : '저장'}
            </button>
            <button type="button" className="secondary" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

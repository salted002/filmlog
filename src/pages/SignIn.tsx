import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export default function SignIn() {
  const { signIn, signInAnonymously } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // 보호 라우트가 넘겨준 '원래 가려던 곳', 없으면 홈으로
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch {
      setError('로그인에 실패했습니다.')
      setSubmitting(false)
    }
  }

  const handleGuestSignIn = async () => {
    try {
      await signInAnonymously()
      navigate(from, { replace: true })
    } catch {
      setError('게스트 로그인에 실패했습니다.')
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
          />
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" disabled={submitting}>
            {submitting ? '로그인 중...' : '로그인'}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={handleGuestSignIn}
          >
            게스트로 체험하기
          </button>
        </form>
        <p className="auth-footer">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  )
}

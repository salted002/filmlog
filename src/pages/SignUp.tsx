import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await signUp(email, password, nickname)
      setDone(true)
    } catch {
      setError('회원가입에 실패했습니다.')
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div>
        가입해주신 이메일로 확인 메일을 보냈어요. 메일함을 확인해주세요!
      </div>
    )
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        {error && <div>{error}</div>}
        <button type="submit" disabled={submitting}>
          {submitting ? '가입 처리 중...' : '회원가입'}
        </button>
      </form>
      <Link to="/signin">로그인</Link>
    </div>
  )
}

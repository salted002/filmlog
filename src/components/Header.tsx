import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, signOut } = useAuth()
  return (
    <header>
      <Link to="/">FilmLog</Link>
      {user ? (
        <div>
          <span>{user.user_metadata?.nickname ?? '게스트'}</span>
          <Link to="/mypage">마이페이지</Link>
          <button onClick={signOut}>로그아웃</button>
        </div>
      ) : (
        <Link to="/signin">로그인</Link>
      )}
    </header>
  )
}

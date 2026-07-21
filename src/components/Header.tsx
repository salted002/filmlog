import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import SearchBar from './SearchBar'

export default function Header() {
  const { user, signOut } = useAuth()
  return (
    <header className="header">
      <Link to="/" className="logo">
        FilmLog
      </Link>

      <div className="header-search">
        <SearchBar />
      </div>

      <nav>
        {user ? (
          <>
            <span className="user-info">
              {user.user_metadata?.nickname ?? '게스트'}
            </span>
            <NavLink
              to="/mypage"
              className={({ isActive }) =>
                `profile-icon ${isActive ? 'active' : ''}`
              }
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </NavLink>
            <button className="secondary" onClick={signOut}>
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/signin">로그인</Link>
        )}
      </nav>
    </header>
  )
}

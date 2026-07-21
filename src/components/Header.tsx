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
        href="https://github.com/salted002/filmlog" target="_blank"
        rel="noopener noreferrer" aria-label="GitHub 저장소"
        className="github-link"
        <a>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
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

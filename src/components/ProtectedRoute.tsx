import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  // 1. 로딩중이면 스피너
  if (isLoading) {
    return <div>스피너</div>
  }

  // 2. 로딩 끝났는데 user가 없으면 로그인 페이지로
  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />
  }

  // 3. 로그인되어있으면 원래 페이지 보여주기
  return children
}

import type { AppUser } from './user'

export type AuthContextType = {
  user: AppUser | null // 로그인 안 했으면 null
  isLoading: boolean // Supabase 세션 확인 중인지
  signUp: (email: string, password: string, nickname: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInAnonymously: () => Promise<void>
  signOut: () => Promise<void>
}

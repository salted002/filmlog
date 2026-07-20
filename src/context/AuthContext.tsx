// 로그인한 사용자의 정보를 앱의 모든 곳에서 알 수 있도록 해주는 전역 상태

import { useEffect, useState, type ReactNode } from 'react'
import type { AppUser } from '../types'
import { supabase } from '../lib/api/supabase'
import { AuthContext } from './AuthContextObject'

/* 전역 상태는 어떤 값을 담고 있어야 할까? (앱의 여러 곳에서 어떤 정보/함수를 필요로 할까?)
   - 현재 로그인한 유저
   - 로그인 함수 (email, password)를 받음
   - 로그아웃 함수

*/

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null) // 처음엔 로그인하지 않은 상태이므로 null로 시작
  const [isLoading, setIsLoading] = useState(true)

  // 회원가입 함수 (supabase 제공 signUp 함수 사용)
  const signUp = async (email: string, password: string, nickname: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    })
    if (error) throw error
  }

  // 로그인 함수 (supabase 제공 signInWithPassword 함수 사용)
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  // 게스트 로그인 함수 (supabase 제공 signInAnonymously 함수 사용)
  const signInAnonymously = async () => {
    const { error } = await supabase.auth.signInAnonymously()
    if (error) throw error
  }

  // 로그아웃 함수 (supabase 제공 signOut 함수 사용)
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  useEffect(() => {
    // 1. 앱이 처음 시작될 때 로그인되어 있는지 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser((session?.user as AppUser) ?? null)
      setIsLoading(false)
    })

    // 2. 로그인/로그아웃 발생할 때마다 자동 확인
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser((session?.user as AppUser) ?? null)
      },
    )

    // 3. 컴포넌트가 사라질 때 감지를 멈추는 부분 (필수 정리 작업)
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, signIn, signInAnonymously, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

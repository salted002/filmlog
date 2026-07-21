import { useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import type { WishItem } from '../types'
import type { WishAction, WishContextType, WishItemInsert } from '../types/wish'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/api/supabase'
import { WishContext } from './WishContextObject'

const wishReducer = (state: WishItem[], action: WishAction): WishItem[] => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    case 'ADD': {
      return [...state, action.payload]
    }
    case 'REMOVE': {
      return state.filter((item) => item.id !== action.payload.id)
    }
    case 'CLEAR': {
      return []
    }
  }
}

export const WishProvider = ({ children }: { children: ReactNode }) => {
  const [wish, dispatch] = useReducer(wishReducer, [])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // 1. 로그인 상태가 바뀔 때마다 사용자의 wish 목록을 Supabase에서 불러온다.
  useEffect(() => {
    let alive = true
    const fetchWish = async () => {
      if (!user) {
        if (alive) {
          dispatch({ type: 'CLEAR' })
          setLoading(false)
        }
        return
      }
      setLoading(true)
      const { data, error } = await supabase
        .from('wish_lists')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      if (alive) {
        if (data) dispatch({ type: 'SET', payload: data })
        setLoading(false)
      }
    }

    fetchWish()

    return () => {
      alive = false
    }
  }, [user])

  // 2. 보고 싶은 영화 추가하기
  const addWish = async (item: WishItemInsert) => {
    const { data, error } = await supabase
      .from('wish_lists')
      .insert(item)
      .select()
      .single()
    if (error) throw error
    dispatch({ type: 'ADD', payload: data })
  }

  // 3. 보고 싶은 영화에서 삭제하기
  const removeWish = async (id: string) => {
    const { error } = await supabase.from('wish_lists').delete().eq('id', id)
    if (error) throw error
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  // 4. 보고 싶은 영화 전체 삭제하기
  const clear = () => dispatch({ type: 'CLEAR' })

  // useMemo를 사용해 리렌더시마다 새로 정의되는 함수를 묶어준다.
  const value = useMemo<WishContextType>(
    () => ({
      wish,
      loading,
      addWish,
      removeWish,
      clear,
    }),
    [wish, loading],
  )

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>
}

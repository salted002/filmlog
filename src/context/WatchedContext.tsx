import { useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import type {
  WatchedAction,
  WatchedContextType,
  WatchedItem,
  WatchedItemInsert,
  WatchedItemUpdate,
} from '../types/watched'
import { useAuth } from '../hooks/useAuth'
import { WatchedContext } from './WatchedContextObject'
import { supabase } from '../lib/api/supabase'

const watchedReducer = (
  state: WatchedItem[],
  action: WatchedAction,
): WatchedItem[] => {
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
    case 'UPDATE': {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      )
    }
    case 'CLEAR': {
      return []
    }
  }
}

export const WatchedProvider = ({ children }: { children: ReactNode }) => {
  const [watched, dispatch] = useReducer(watchedReducer, [])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // 1. 로그인 상태가 바뀔 때마다 사용자의 watched 목록을 Supabase에서 불러온다.
  useEffect(() => {
    let alive = true
    const fetchWatched = async () => {
      if (!user) {
        if (alive) {
          dispatch({ type: 'CLEAR' })
          setLoading(false)
        }
        return
      }
      setLoading(true)
      const { data, error } = await supabase
        .from('watched_lists')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      if (alive) {
        if (data) dispatch({ type: 'SET', payload: data })
        setLoading(false)
      }
    }

    fetchWatched()

    return () => {
      alive = false
    }
  }, [user])

  // 2. 본 영화 기록 추가하기
  const addWatched = async (item: WatchedItemInsert) => {
    const { data, error } = await supabase
      .from('watched_lists')
      .insert(item)
      .select()
      .single()
    if (error) throw error
    dispatch({ type: 'ADD', payload: data })
  }

  // 3. 본 영화 기록 삭제하기
  const removeWatched = async (id: string) => {
    const { error } = await supabase.from('watched_lists').delete().eq('id', id)
    if (error) throw error
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  // 4. 본 영화 기록 수정하기
  const updateWatched = async (id: string, changes: WatchedItemUpdate) => {
    const { data, error } = await supabase
      .from('watched_lists')
      .update(changes)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    dispatch({ type: 'UPDATE', payload: data })
  }

  // 5. 본 영화 전체 삭제하기
  const clear = () => dispatch({ type: 'CLEAR' })

  //useMemo를 사용해 리렌더시마다 새로 정의되는 함수를 묶어준다.
  const value = useMemo<WatchedContextType>(
    () => ({
      watched,
      loading,
      addWatched,
      removeWatched,
      updateWatched,
      clear,
    }),
    [watched, loading],
  )

  return (
    <WatchedContext.Provider value={value}>{children}</WatchedContext.Provider>
  )
}

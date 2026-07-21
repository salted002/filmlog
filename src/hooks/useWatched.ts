import { useContext } from 'react'
import { WatchedContext } from '../context/WatchedContextObject'
export const useWatched = () => {
  const context = useContext(WatchedContext)
  if (!context) {
    throw new Error('useWatched는 WatchedProvider 안에서만 사용할 수 있습니다.')
  }
  return context
}

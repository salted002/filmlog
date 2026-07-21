import { useContext } from 'react'
import { WishContext } from '../context/WishContextObject'

export const useWish = () => {
  const context = useContext(WishContext)
  if (!context) {
    throw new Error('useWish는 WishProvider 안에서만 사용할 수 있습니다.')
  }
  return context
}

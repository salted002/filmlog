export type WishItem = {
  id: string
  user_id: string
  movie_id: number
  title: string
  poster_path: string | null
  created_at: string
}

export type WishItemInsert = Omit<WishItem, 'id' | 'created_at'>

export type WishAction =
  | { type: 'SET'; payload: WishItem[] }
  | { type: 'ADD'; payload: WishItem }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' }

export type WishContextType = {
  wish: WishItem[]
  loading: boolean
  addWish: (item: WishItemInsert) => Promise<void>
  removeWish: (id: string) => Promise<void>
  clear: () => void
}

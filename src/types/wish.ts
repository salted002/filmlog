export type WishItem = {
  id: string
  user_id: string
  movie_id: number
  title: string
  poster_path: string | null
  created_at: string
}

export type WishItemInsert = Omit<WishItem, 'id' | 'created_at'>

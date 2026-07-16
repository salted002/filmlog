// Supabase의 watched_lists 테이블을 옮김
export type WatchedItem = {
  id: string
  user_id: string
  movie_id: number
  title: string
  poster_path: string | null
  user_rating: number | null
  comment: string | null
  watched_date: string | null // 'YYYY-MM-DD' 형태로 넘어옴
  created_at: string
}

// insert 모달에서 쓸 타입 (id, created_at은 DB가 자동생성하므로 제외)
export type WatchedItemInsert = Omit<WatchedItem, 'id' | 'created_at'>

// update 모달에서 쓸 타입 (바꿀 수 있는 필드)
export type WatchedItemUpdate = Partial<
  Pick<WatchedItem, 'user_rating' | 'comment' | 'watched_date'>
>

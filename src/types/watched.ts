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

// WatchedItem 변경 동작들을 판별 유니온으로 정의
export type WatchedAction =
  | { type: 'SET'; payload: WatchedItem[] } // 목록 전체 불러오기
  | { type: 'ADD'; payload: WatchedItem } // 기록 추가
  | { type: 'REMOVE'; payload: { id: string } } // 기록 삭제
  | { type: 'UPDATE'; payload: WatchedItem } // 기록 수정
  | { type: 'CLEAR' } // 기록 전체 삭제

/* 아래 2개는 추가/수정 시 뜨는 모달에서 쓸 타입들 */
// 1. insert 모달에서 쓸 타입 (id, created_at은 DB가 자동생성하므로 제외)
export type WatchedItemInsert = Omit<WatchedItem, 'id' | 'created_at'>

// 2. update 모달에서 쓸 타입 (바꿀 수 있는 필드)
export type WatchedItemUpdate = Partial<
  Pick<WatchedItem, 'user_rating' | 'comment' | 'watched_date'>
>

// 3. Watched Context Type
export type WatchedContextType = {
  watched: WatchedItem[]
  loading: boolean
  addWatched: (item: WatchedItemInsert) => Promise<void>
  removeWatched: (id: string) => Promise<void>
  updateWatched: (id: string, changes: WatchedItemUpdate) => Promise<void>
  clear: () => void
}

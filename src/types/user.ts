/* Supabase Auth가 제공하는 사용자 정보 타입.
   닉네임은 따로 정의되어있지 않기 때문에, user_metadata 속성을 확장해서 써 준다.
*/
import type { User } from '@supabase/supabase-js'

export type AppUser = User & {
  user_metadata: {
    nickname: string
  }
}

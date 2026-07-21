# 🎬 FilmLog

영화를 검색하고, 본 영화를 기록하고, 보고 싶은 영화를 찜하는 개인 영화 기록 웹앱입니다.

🔗 **배포 링크**: [https://filmlog-puce.vercel.app](https://filmlog-puce.vercel.app)

## 주요 기능

- **영화 검색**: TMDB API 기반 영화 검색, 페이지네이션 지원
- **영화 상세 정보**: 줄거리, 장르, 감독, 러닝타임, 제작국가 등 확인
- **본 영화 기록**: 별점(10점 만점), 감상평, 감상일 기록
- **보고 싶어요**: 관심 있는 영화 찜하기
- **마이페이지**: 기록한 영화 / 찜한 영화 목록 확인 및 삭제
- **인증**: 이메일 회원가입/로그인, 게스트(익명) 로그인 지원
- **보호 라우팅**: 로그인하지 않은 사용자는 마이페이지 접근 시 로그인 페이지로 리다이렉트

## 기술 스택

- **Frontend**: React, TypeScript, Vite
- **Routing**: React Router
- **State Management**: Context API + useReducer (Watched/Wish), Context API (Auth)
- **Backend / DB / Auth**: Supabase (PostgreSQL, Auth, RLS)
- **외부 API**: TMDB (The Movie Database)
- **배포**: Vercel

## 폴더 구조
```
src/
├── components/       # 재사용 컴포넌트 (MovieCard, SearchBar, WatchedModal, Header 등)
├── context/          # Context + Provider (Auth, Watched, Wish)
├── hooks/            # 커스텀 훅 (useAuth, useWatched, useWish, useMovies)
├── lib/
│   └── api/          # Supabase 클라이언트, TMDB API 함수
├── pages/            # 라우트별 페이지 컴포넌트
├── types/            # 타입 정의 (도메인별)
├── App.tsx
└── main.tsx
```

## 실행 방법

```bash
# 저장소 클론
git clone https://github.com/salted002/filmlog
cd filmlog

# 패키지 설치
npm install

# 환경변수 설정 (.env 파일 생성)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TMDB_TOKEN=your_tmdb_read_access_token

# 개발 서버 실행
npm run dev
```

## 주요 설계 포인트

- Supabase Auth의 세션 상태를 `AuthContext`에서 전역으로 관리하고, `onAuthStateChange`로 실시간 반영
- `Watched`/`Wish` 데이터는 `useReducer`로 액션 기반 상태 관리, Supabase CRUD와 연동
- 로그인 상태에 따라 `watched`/`wish` 데이터를 자동으로 불러오거나 초기화
- TMDB 검색은 URL 쿼리 파라미터(`?q=`, `page`)로 상태 관리하여 새로고침/공유 시에도 유지
- `ProtectedRoute`로 인증이 필요한 페이지 접근 제어, 로그인 후 원래 페이지로 자동 복귀

## 향후 개선 사항

- 감상일 기준 캘린더 뷰
- 장르/평점 기준 필터링
- 반응형 모바일 UI 개선

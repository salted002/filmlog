// 메인 및 검색결과 목록에서 쓸 각 영화 요약버전 정보
export type MovieSummary = {
  id: number
  title: string
  poster_path: string | null
  release_date: string | null
  vote_average: number
}

// 상세페이지에서 쓸 각 영화의 모든 정보
export type MovieDetail = MovieSummary & {
  overview: string | null
  genres: { id: number; name: string }[] | null // genres 속성이 객체의 배열임
  runtime: number | null
  production_countries: { iso_3166_1: string; name: string }[]
  credits: {
    crew: {
      job: string
      name: string
    }[]
  }
}

// 검색결과 페이지에서 쓸 정보 (결과 개수, 페이지네이션 등)
// search/movie 또는 discover/movie에서
export type MovieSearchResponse = {
  page: number
  results: MovieSummary[]
  total_pages: number
  total_results: number
}

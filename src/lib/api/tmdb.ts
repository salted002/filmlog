import { FAVORITE_MOVIE_IDS } from '../../constants/favorites'
import type { MovieDetail, MovieSearchResponse } from '../../types'

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN

// 1. 검색어 & 페이지로 영화 검색 목록 가져오기
export const searchMovies = async (
  query: string,
  page: number,
): Promise<MovieSearchResponse> => {
  // async 함수는 항상 Promise로 감싼 값을 리턴한다.

  // 검색어에 한글/특수문자/공백이 들어가면 URL이 깨질 수 있으므로, encodeURIComponent()로 감싸준다.
  const keyword = encodeURIComponent(query)

  const url = `${TMDB_BASE_URL}/search/movie?query=${keyword}&include_adult=true&language=ko-KR&page=${page}`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  }

  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`요청이 실패했습니다: ${res.status}`)
  }

  // res.json()은 Promise<any>를 반환한다. 반환 타입을 Promise<MovieSearchResponse>로 선언해두었기 때문에 일단 믿고 넘어가주는 것 -> 실서비스에선 zod 등으로 검증 라이브러리를 사용해야 한다.
  return res.json()
}

// 2. id값으로 영화 상세정보 가져오기
export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const url = `${TMDB_BASE_URL}/movie/${id}?append_to_response=credits&language=ko-KR`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  }

  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`요청이 실패했습니다: ${res.status}`)
  }

  return res.json()
}

// 3. 메인 페이지에 보여줄 영화(하드코딩값)
export const getFavoriteMovies = async (): Promise<MovieDetail[]> => {
  // Promise.all()이 없다면 map의 결과는 Promise[]가 된다. (Promise 객체들의 배열) => Promise.all()함수는 Promise가 다 끝날 때까지 기다렸다가, 실제 값의 배열로 바꿔준다.
  const movies = await Promise.all(
    FAVORITE_MOVIE_IDS.map((id) => getMovieDetail(id)),
  )

  return movies
}

// 4. 각 영화의 포스터 URL 얻기
export const getPosterUrl = (path: string | null, size: number) => {
  if (!path) return null
  const url = `https://image.tmdb.org/t/p/w${size}${path}`
  return url
}

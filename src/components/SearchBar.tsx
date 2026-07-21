import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input)}`)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="영화를 제목으로 검색해보세요."
      />
      <button type="submit">검색</button>
    </form>
  )
}

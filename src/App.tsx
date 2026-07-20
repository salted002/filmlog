import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetail'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element="" />
      </Routes>
    </AuthProvider>
  )
}

export default App

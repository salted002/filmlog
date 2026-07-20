import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/search" element="" />
        <Route path="/movie/:id" element="" />
        <Route path="/signin" element="" />
        <Route path="/signup" element="" />
        <Route path="/mypage" element="" />
      </Routes>
    </AuthProvider>
  )
}

export default App

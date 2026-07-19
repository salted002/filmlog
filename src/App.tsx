import './App.css'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div>
        <h1>hey</h1>
      </div>
    </AuthProvider>
  )
}

export default App

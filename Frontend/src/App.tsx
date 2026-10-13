import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar.tsx'
import Home from './pages/Home.tsx';
import Chat from './pages/Chat.tsx';
import Settings from './pages/Settings.tsx';
import './components/style/variables.css'

function App() {

  return (
    <>
      <div className="main">
        <Sidebar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<div>404 — Not Found</div>} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App;
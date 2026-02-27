import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand" onClick={() => navigate('/')}>
          <span className="brand-icon">📝</span>
          <span className="brand-text">Todo App</span>
        </div>
        <div className="header-subtitle">Real-time Task Management</div>

        <div className="header-user">
          {user && (
            <>
              <span className="user-name">👤 {user.username}</span>
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

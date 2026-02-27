import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    const username = localStorage.getItem('currentUser')
    if (token && username) {
      setUser({ username })
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    setUser(null)
    setError(null)
  }

  const setAuthUser = (username, token) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('currentUser', username)
    setUser({ username })
  }

  return (
    <AuthContext.Provider
      value={{ user, setAuthUser, logout, loading, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

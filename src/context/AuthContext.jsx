import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'mekhil_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try { setUser(JSON.parse(raw)) } catch { /* ignore */ }
    }
    // Dev override: ?admin=1 in URL promotes to admin
    const params = new URLSearchParams(window.location.search)
    if (params.get('admin') === '1') {
      const promoted = { name: 'Admin', email: 'admin@mekhil.com', role: 'admin', enrolled: [] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(promoted))
      setUser(promoted)
    }
  }, [])

  const login = (email) => {
    const isAdmin = email === 'admin@mekhil.com'
    const u = {
      name: email.split('@')[0],
      email,
      firstName: 'Keamlak',
      lastName: 'Girma',
      role: isAdmin ? 'admin' : 'user',
      enrolled: ['finding-x-in-marketing'],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const signup = (payload) => {
    const u = { ...payload, role: 'user', enrolled: [] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthed: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
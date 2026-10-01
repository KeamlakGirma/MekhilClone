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
  }, [])

  const login = (email) => {
    const u = {
      name: email.split('@')[0],
      email,
      firstName: 'Keamlak',
      lastName: 'Girma',
      enrolled: ['finding-x-in-marketing'],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const signup = (payload) => {
    const u = { ...payload, enrolled: [] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthed: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
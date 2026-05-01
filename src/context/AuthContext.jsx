import React, { createContext, useContext, useState, useCallback } from 'react'
import { load, save, remove, KEYS } from '../utils/storage'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load(KEYS.USER, null))

  const signup = useCallback((name, email, password) => {
    const db = load(KEYS.USERS_DB, [])
    if (db.find(u => u.email === email)) throw new Error('Email already registered')
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: name.trim(),
      email,
      password,
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=065f46&textColor=ffffff`,
    }
    save(KEYS.USERS_DB, [...db, newUser])
    const { password: _, ...safe } = newUser
    setUser(safe)
    save(KEYS.USER, safe)
    return safe
  }, [])

  const login = useCallback((email, password) => {
    const db = load(KEYS.USERS_DB, [])
    const found = db.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const { password: _, ...safe } = found
    setUser(safe)
    save(KEYS.USER, safe)
    return safe
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    remove(KEYS.USER)
  }, [])

  return (
    <Ctx.Provider value={{ user, login, logout, signup, isAuthenticated: !!user }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

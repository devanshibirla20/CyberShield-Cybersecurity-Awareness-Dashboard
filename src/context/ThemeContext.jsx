import React, { createContext, useContext, useState, useEffect } from 'react'
import { load, save, KEYS } from '../utils/storage'

const Ctx = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => load(KEYS.THEME, 'dark') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    save(KEYS.THEME, isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(p => !p)

  return <Ctx.Provider value={{ isDark, toggleTheme }}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}

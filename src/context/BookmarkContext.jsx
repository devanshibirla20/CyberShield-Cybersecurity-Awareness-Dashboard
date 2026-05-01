import React, { createContext, useContext, useState, useCallback } from 'react'
import { load, save, KEYS } from '../utils/storage'

const Ctx = createContext(null)

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => load(KEYS.BOOKMARKS, []))

  const sync = useCallback(updater => {
    setBookmarks(prev => {
      const next = updater(prev)
      save(KEYS.BOOKMARKS, next)
      return next
    })
  }, [])

  const addBookmark = useCallback(article => {
    sync(prev => prev.find(b => b.id === article.id) ? prev : [...prev, { ...article, savedAt: new Date().toISOString() }])
  }, [sync])

  const removeBookmark = useCallback(id => {
    sync(prev => prev.filter(b => b.id !== id))
  }, [sync])

  const isBookmarked = useCallback(id => bookmarks.some(b => b.id === id), [bookmarks])

  const toggleBookmark = useCallback(article => {
    if (bookmarks.some(b => b.id === article.id)) removeBookmark(article.id)
    else addBookmark(article)
  }, [bookmarks, addBookmark, removeBookmark])

  return (
    <Ctx.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark, bookmarkCount: bookmarks.length }}>
      {children}
    </Ctx.Provider>
  )
}

export function useBookmarks() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBookmarks must be inside BookmarkProvider')
  return ctx
}

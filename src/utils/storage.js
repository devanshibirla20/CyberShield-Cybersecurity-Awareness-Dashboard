export const KEYS = {
  USER:      'cs_user',
  USERS_DB:  'cs_users_db',
  BOOKMARKS: 'cs_bookmarks',
  THEME:     'cs_theme',
}

export function load(key, fallback = null) {
  try {
    const v = localStorage.getItem(key)
    return v !== null ? JSON.parse(v) : fallback
  } catch { return fallback }
}

export function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function remove(key) {
  try { localStorage.removeItem(key) } catch {}
}

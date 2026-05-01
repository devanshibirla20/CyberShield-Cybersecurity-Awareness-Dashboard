import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth }      from '../context/AuthContext'
import { useBookmarks } from '../context/BookmarkContext'
import { useTheme }     from '../context/ThemeContext'
import { formatDate }   from '../utils/formatDate'
import { getCategoryColor, getCategoryIcon } from '../utils/categorize'

export default function Profile() {
  const { user, logout }        = useAuth()
  const { bookmarks }           = useBookmarks()
  const { isDark, toggleTheme } = useTheme()
  const navigate                = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const catStats = bookmarks.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">

      {/* Profile card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative shrink-0">
            <img src={user?.avatar} alt={user?.name} className="w-24 h-24 rounded-2xl border-2 border-green-500/40" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-mono font-bold text-gray-100">{user?.name}</h1>
            <p className="text-green-400/80 font-mono text-sm mt-0.5">{user?.email}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-green-500/20 border border-green-500/30 text-green-400">🛡️ Security Agent</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-800 border border-gray-700 text-gray-400">📅 Joined {formatDate(user?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="text-3xl font-mono font-bold text-green-400">{bookmarks.length}</div>
          <div className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">Saved Articles</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="text-3xl font-mono font-bold text-green-400">{Object.keys(catStats).length}</div>
          <div className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">Categories Tracked</div>
        </div>
      </div>

      {/* Bookmark breakdown */}
      {bookmarks.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-mono font-bold text-gray-200 mb-4">📊 Saved by Category</h2>
          <div className="space-y-3">
            {Object.entries(catStats).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold border shrink-0 ${getCategoryColor(cat)}`}>
                  {getCategoryIcon(cat)} {cat}
                </span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${(count / bookmarks.length) * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-gray-400 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-mono font-bold text-gray-200">⚙️ Settings</h2>

        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <div>
            <p className="text-sm font-mono text-gray-200">Display Theme</p>
            <p className="text-xs text-gray-500 mt-0.5">{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isDark ? 'bg-green-500' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl font-mono font-bold text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all duration-200"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  )
}

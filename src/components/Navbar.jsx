import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth }      from '../context/AuthContext'
import { useTheme }     from '../context/ThemeContext'
import { useBookmarks } from '../context/BookmarkContext'

export default function Navbar() {
  const { user, logout }       = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { bookmarkCount }       = useBookmarks()
  const navigate                = useNavigate()
  const [open, setOpen]         = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  const navCls = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm transition-all duration-200 ${
      isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent'
    }`

  const links = [
    { to: '/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/news',      icon: '📰', label: 'News' },
    { to: '/bookmarks', icon: '🔖', label: `Saved`, badge: bookmarkCount },
    { to: '/profile',   icon: '👤', label: 'Profile' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <span className="text-lg">🛡️</span>
            </div>
            <span className="font-mono font-bold text-lg">
              <span className="text-green-400">Cyber</span><span className="text-gray-100">Shield</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, icon, label, badge }) => (
              <NavLink key={to} to={to} className={navCls}>
                {icon} {label}
                {badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-black rounded-full font-bold leading-none">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {user && (
              <div className="hidden md:flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-green-500/40" />
                <span className="text-sm text-gray-300 font-mono max-w-[120px] truncate">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-mono text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(p => !p)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 border-t border-gray-800 flex flex-col gap-1">
            {links.map(({ to, icon, label, badge }) => (
              <NavLink key={to} to={to} className={navCls} onClick={() => setOpen(false)}>
                {icon} {label}
                {badge > 0 && <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-black rounded-full font-bold">{badge}</span>}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="mt-1 text-left px-3 py-1.5 text-sm font-mono text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

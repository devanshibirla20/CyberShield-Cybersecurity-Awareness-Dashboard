import React, { useState } from 'react'
import { useBookmarks } from '../context/BookmarkContext'
import { useAuth }      from '../context/AuthContext'
import { getCategoryColor, getCategoryIcon } from '../utils/categorize'
import { timeAgo, formatDate } from '../utils/formatDate'

export default function ArticleCard({ article, index = 0 }) {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { isAuthenticated } = useAuth()
  const [imgErr, setImgErr] = useState(false)

  if (!article) return null

  const saved = isBookmarked(article.id)
  const delay = `stagger-${Math.min(index + 1, 5)}`

  const handleBookmark = e => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) { alert('Please log in to save articles.'); return }
    toggleBookmark(article)
  }

  const handleReadMore = e => {
    e.stopPropagation()
    if (article.url && article.url.startsWith('http')) {
      window.open(article.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <article className={`group relative flex flex-col rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 card-hover animate-slide-up ${delay}`}>

      {/* ── Image ── */}
      <div className="relative h-44 overflow-hidden bg-gray-800 shrink-0">
        {!imgErr && article.image ? (
          <img
            src={article.image}
            alt={article.title}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-5xl opacity-30">{getCategoryIcon(article.category)}</span>
          </div>
        )}

        {/* Category badge */}
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold border backdrop-blur-sm ${getCategoryColor(article.category)}`}>
          {getCategoryIcon(article.category)} {article.category}
        </span>

        {/* Bookmark button */}
        <button
          onClick={handleBookmark}
          className={`absolute top-3 right-3 p-2 rounded-full border transition-all duration-200 hover:scale-110 backdrop-blur-sm ${
            saved
              ? 'bg-green-500/90 border-green-400 text-white'
              : 'bg-black/50 border-white/20 text-white hover:bg-green-500/60'
          }`}
          title={saved ? 'Remove bookmark' : 'Save article'}
        >
          {saved ? '🔖' : '🏷️'}
        </button>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-green-400/90 font-semibold truncate mr-2">
            {article.source?.name ?? 'Unknown'}
          </span>
          <span className="text-xs text-gray-500 font-mono shrink-0" title={formatDate(article.publishedAt)}>
            {timeAgo(article.publishedAt)}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-100 mb-2 leading-snug line-clamp-2 group-hover:text-green-400 transition-colors duration-200">
          {article.title}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {article.description ?? 'No description available.'}
        </p>

        <button
          onClick={handleReadMore}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-green-400 hover:text-green-300 transition-colors group/link w-fit"
        >
          Read Article
          <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}

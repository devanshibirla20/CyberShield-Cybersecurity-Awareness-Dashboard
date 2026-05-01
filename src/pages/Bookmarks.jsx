import React, { useState, useMemo } from 'react'
import { useBookmarks } from '../context/BookmarkContext'
import ArticleCard      from '../components/ArticleCard'
import SearchBar        from '../components/SearchBar'
import CategoryFilter   from '../components/CategoryFilter'
import EmptyState       from '../components/EmptyState'

export default function Bookmarks() {
  const { bookmarks, removeBookmark, bookmarkCount } = useBookmarks()
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    let r = [...bookmarks]
    if (category !== 'All') r = r.filter(a => a.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(a => a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q))
    }
    return r.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
  }, [bookmarks, search, category])

  const clearAll = () => {
    if (window.confirm(`Remove all ${bookmarkCount} saved articles?`)) {
      bookmarks.forEach(b => removeBookmark(b.id))
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-mono font-bold text-gray-100">
            <span className="text-green-400">// </span>Saved Articles
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-mono">
            {bookmarkCount} {bookmarkCount === 1 ? 'article' : 'articles'} saved
          </p>
        </div>
        {bookmarkCount > 0 && (
          <button onClick={clearAll} className="px-4 py-2 rounded-xl font-mono text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all">
            🗑️ Clear All
          </button>
        )}
      </div>

      {bookmarkCount === 0 ? (
        <EmptyState
          icon="🔖" title="No saved articles"
          description="Go to the News feed and click the bookmark icon to save articles here."
          action={{ label: 'Go to News Feed', onClick: () => window.location.href = '/news' }}
        />
      ) : (
        <>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8 space-y-4">
            <SearchBar value={search} onChange={setSearch} placeholder="Search saved articles..." />
            <CategoryFilter active={category} onChange={setCategory} />
            {(search || category !== 'All') && (
              <p className="text-xs font-mono text-gray-500">
                Showing {filtered.length} of {bookmarkCount}
                <button onClick={() => { setSearch(''); setCategory('All') }} className="text-green-400 hover:text-green-300 underline ml-2">Clear</button>
              </p>
            )}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon="🔍" title="No matches" description="No saved articles match your filter." action={{ label: 'Clear Filters', onClick: () => { setSearch(''); setCategory('All') } }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
            </div>
          )}
        </>
      )}
    </div>
  )
}

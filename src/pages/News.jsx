import React, { useState, useMemo } from 'react'
import { useDebounce }  from '../hooks/useDebounce'
import { useNews }      from '../hooks/useNews'
import ArticleCard      from '../components/ArticleCard'
import SearchBar        from '../components/SearchBar'
import CategoryFilter   from '../components/CategoryFilter'
import LoadingSpinner   from '../components/LoadingSpinner'
import EmptyState       from '../components/EmptyState'

export default function News() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [sort,     setSort]     = useState('latest')

  const debounced = useDebounce(search, 500)
  const { articles, loading, error, refetch } = useNews(debounced || 'cybersecurity')

  const displayed = useMemo(() => {
    let r = [...articles]
    if (category !== 'All')    r = r.filter(a => a.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(a => a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q))
    }
    r.sort((a, b) => {
      const d = new Date(b.publishedAt) - new Date(a.publishedAt)
      return sort === 'latest' ? d : -d
    })
    return r
  }, [articles, category, search, sort])

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-gray-100">
          <span className="text-green-400">// </span>Threat Feed
        </h1>
        <p className="text-gray-500 mt-1 text-sm font-mono">
          Cybersecurity intelligence — {articles.length} articles loaded
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search threats, malware, breaches..." />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl font-mono text-sm bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/40 cursor-pointer"
          >
            <option value="latest">⬆ Latest First</option>
            <option value="oldest">⬇ Oldest First</option>
          </select>
        </div>
        <CategoryFilter active={category} onChange={setCategory} />
        {(search || category !== 'All') && (
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>Showing {displayed.length} of {articles.length}</span>
            <button onClick={() => { setSearch(''); setCategory('All') }} className="text-green-400 hover:text-green-300 underline ml-1">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-mono flex items-center justify-between">
          <span>⚠️ API Error: {error} — Showing cached data</span>
          <button onClick={refetch} className="ml-4 px-3 py-1 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors text-xs">Retry</button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <LoadingSpinner message="Scanning threat intelligence..." />
      ) : displayed.length === 0 ? (
        <EmptyState
          icon="🔍" title="No threats found"
          description="Try a different search term or clear your filters."
          action={{ label: 'Clear Filters', onClick: () => { setSearch(''); setCategory('All') } }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayed.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
        </div>
      )}
    </div>
  )
}

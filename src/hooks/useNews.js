import { useState, useEffect, useCallback } from 'react'
import { fetchCyberNews, MOCK_ARTICLES } from '../services/newsApi'
import { categorizeArticle } from '../utils/categorize'
import { safeId } from '../utils/safeId'

function enrich(raw) {
  return raw.map(a => ({
    ...a,
    category: categorizeArticle(a),
    id: safeId(a.url ?? a.title ?? String(Math.random())),
  }))
}

export function useNews(query = 'cybersecurity') {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const apiKey = import.meta.env.VITE_GNEWS_API_KEY
      const useMock = !apiKey || apiKey === 'your_gnews_api_key_here'

      if (useMock) {
        // Simulate a brief loading delay for realism
        await new Promise(r => setTimeout(r, 600))
        setArticles(enrich(MOCK_ARTICLES))
      } else {
        const raw = await fetchCyberNews(query)
        setArticles(enrich(raw.length ? raw : MOCK_ARTICLES))
      }
    } catch (err) {
      setError(err.message)
      setArticles(enrich(MOCK_ARTICLES))
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => { run() }, [run])

  return { articles, loading, error, refetch: run }
}

import React, { useMemo } from 'react'
import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
} from 'recharts'
import { useNews }      from '../hooks/useNews'
import { useBookmarks } from '../context/BookmarkContext'
import { useAuth }      from '../context/AuthContext'
import StatCard         from '../components/StatCard'
import LoadingSpinner   from '../components/LoadingSpinner'
import { formatDate }   from '../utils/formatDate'
import { getCategoryIcon, getCategoryChartColor } from '../utils/categorize'

/* ── Recharts shared tooltip style ─────────────────────────── */
const TT = {
  backgroundColor: '#111827',
  border: '1px solid rgba(34,197,94,0.25)',
  borderRadius: '10px',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 12,
  color: '#d1fae5',
  padding: '8px 12px',
}

/* ── Custom Pie label ───────────────────────────────────────── */
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.05) return null
  const R = innerRadius + (outerRadius - innerRadius) * 0.5
  const rad = (midAngle * Math.PI) / 180
  const x = cx + (R + 28) * Math.cos(-rad)
  const y = cy + (R + 28) * Math.sin(-rad)
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
      fill="#9ca3af" fontSize={11} fontFamily="monospace">
      {getCategoryIcon(name)} {(percent * 100).toFixed(0)}%
    </text>
  )
}

export default function Dashboard() {
  const { articles, loading } = useNews('cybersecurity')
  const { bookmarks }         = useBookmarks()
  const { user }              = useAuth()

  /* ── Category counts ─────────────────────────────────────── */
  const counts = useMemo(() => {
    const c = { Ransomware: 0, Phishing: 0, 'Data Breach': 0, Malware: 0, General: 0 }
    articles.forEach(a => { if (c[a.category] !== undefined) c[a.category]++ })
    return c
  }, [articles])

  /* ── Pie data ─────────────────────────────────────────────── */
  const pieData = useMemo(() =>
    Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value })),
    [counts]
  )

  /* ── Bar data: articles grouped by day ───────────────────── */
  const barData = useMemo(() => {
    const map = {}
    articles.forEach(a => {
      const day = formatDate(a.publishedAt)
      map[day] = (map[day] ?? 0) + 1
    })
    return Object.entries(map).map(([date, count]) => ({ date, count }))
  }, [articles])

  /* ── Area data: cumulative bookmarks ─────────────────────── */
  const areaData = useMemo(() => {
    const sorted = [...bookmarks].sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt))
    let cum = 0
    return sorted.map(b => ({ date: formatDate(b.savedAt), total: ++cum }))
  }, [bookmarks])

  /* ── Recent 5 articles ────────────────────────────────────── */
  const recent = useMemo(() =>
    [...articles]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 5),
    [articles]
  )

  if (loading) return <LoadingSpinner message="Loading intelligence dashboard..." />

  return (
    <div className="animate-fade-in space-y-8">

      {/* ── Welcome Banner ──────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-mono font-bold text-gray-100">
            Welcome back, <span className="text-green-400">{user?.name ?? 'Agent'}</span> 👋
          </h1>
          <p className="text-sm text-gray-500 font-mono mt-1">
            {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            {' · '}Threat level: <span className="text-red-400 font-semibold">ELEVATED</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-red-400 font-semibold">LIVE FEED</span>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon="📰" label="Total Articles" value={articles.length} color="green" trend="Mock / Live feed" />
        <StatCard icon="🔒" label="Ransomware"     value={counts.Ransomware}     color="red"    />
        <StatCard icon="🎣" label="Phishing"       value={counts.Phishing}       color="yellow" />
        <StatCard icon="💧" label="Data Breaches"  value={counts['Data Breach']} color="orange" />
        <StatCard icon="🦠" label="Malware"        value={counts.Malware}        color="purple" />
      </div>

      {/* ── Charts ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-mono font-bold text-gray-200 mb-1">🥧 Threat Category Distribution</h2>
          <p className="text-xs text-gray-500 font-mono mb-4">Breakdown of detected threat types</p>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={65} outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={<PieLabel />}
                >
                  {pieData.map(e => (
                    <Cell key={e.name} fill={getCategoryChartColor(e.name)} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v, n) => [`${v} articles`, n]} />
                <Legend
                  formatter={v => (
                    <span style={{ color:'#9ca3af', fontFamily:'monospace', fontSize:12 }}>
                      {getCategoryIcon(v)} {v}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-600 font-mono py-20 text-sm">No data yet</p>
          )}
        </div>

        {/* Bar chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-mono font-bold text-gray-200 mb-1">📊 Article Frequency</h2>
          <p className="text-xs text-gray-500 font-mono mb-4">Number of threat articles per day</p>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.07)" />
                <XAxis dataKey="date" tick={{ fill:'#6b7280', fontSize:10, fontFamily:'monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#6b7280', fontSize:10, fontFamily:'monospace' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" name="Articles" fill="#22c55e" radius={[6,6,0,0]} fillOpacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-600 font-mono py-20 text-sm">No data yet</p>
          )}
        </div>
      </div>

      {/* Area chart */}
      {areaData.length > 1 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-mono font-bold text-gray-200 mb-1">📈 Bookmark Growth</h2>
          <p className="text-xs text-gray-500 font-mono mb-4">Cumulative saved articles over time</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.07)" />
              <XAxis dataKey="date" tick={{ fill:'#6b7280', fontSize:10, fontFamily:'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#6b7280', fontSize:10, fontFamily:'monospace' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={TT} />
              <Area type="monotone" dataKey="total" name="Bookmarks" stroke="#22c55e" strokeWidth={2} fill="url(#areaGreen)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Recent Intelligence ──────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-base font-mono font-bold text-gray-200 mb-5">🕐 Recent Intelligence</h2>

        {recent.length === 0 ? (
          <p className="text-gray-600 font-mono text-sm text-center py-8">No articles loaded yet.</p>
        ) : (
          <div className="space-y-2">
            {recent.map(a => (
              <RecentItem key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Separate component so each item manages its own state ─── */
function RecentItem({ article }) {
  const handleClick = () => {
    if (article.url && article.url.startsWith('http')) {
      window.open(article.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      className="flex items-start gap-3 p-3 rounded-xl cursor-pointer
                 border border-transparent hover:border-gray-700 hover:bg-gray-800/60
                 transition-all duration-200 group select-none"
    >
      <span className="text-xl mt-0.5 shrink-0">{getCategoryIcon(article.category)}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-200 group-hover:text-green-400 transition-colors line-clamp-1 leading-snug">
          {article.title}
        </p>
        <p className="text-xs text-gray-500 font-mono mt-0.5">
          {article.source?.name ?? 'Unknown'} · {formatDate(article.publishedAt)}
        </p>
      </div>
      <span className="text-gray-600 group-hover:text-green-400 transition-colors shrink-0 text-sm mt-1">→</span>
    </div>
  )
}

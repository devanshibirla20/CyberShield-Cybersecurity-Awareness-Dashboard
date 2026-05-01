import React from 'react'

const COLORS = {
  green:  { border:'border-green-500/30',  bg:'bg-green-500/10',  text:'text-green-400'  },
  red:    { border:'border-red-500/30',    bg:'bg-red-500/10',    text:'text-red-400'    },
  yellow: { border:'border-yellow-500/30', bg:'bg-yellow-500/10', text:'text-yellow-400' },
  purple: { border:'border-purple-500/30', bg:'bg-purple-500/10', text:'text-purple-400' },
  orange: { border:'border-orange-500/30', bg:'bg-orange-500/10', text:'text-orange-400' },
}

export default function StatCard({ icon, label, value, color = 'green', trend }) {
  const c = COLORS[color] ?? COLORS.green
  return (
    <div className={`rounded-2xl border p-5 card-hover ${c.border} ${c.bg}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl font-mono font-bold text-gray-100">{value}</p>
          {trend && <p className="text-xs text-gray-500 mt-1 font-mono">{trend}</p>}
        </div>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
    </div>
  )
}

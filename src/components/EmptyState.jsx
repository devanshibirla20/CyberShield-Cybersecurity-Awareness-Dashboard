import React from 'react'

export default function EmptyState({ icon = '🔍', title = 'Nothing here', description = '', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-4 text-center px-4">
      <div className="text-6xl opacity-40">{icon}</div>
      <h3 className="text-xl font-mono font-bold text-gray-300">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-5 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 font-mono text-sm rounded-xl hover:bg-green-500/30 transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

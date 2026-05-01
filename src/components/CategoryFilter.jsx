import React from 'react'
import { ALL_CATEGORIES, getCategoryIcon } from '../utils/categorize'

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all duration-200 ${
            active === cat
              ? 'bg-green-500 text-black border-green-400 shadow-lg shadow-green-500/20'
              : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-green-600 hover:text-green-400'
          }`}
        >
          {cat !== 'All' && getCategoryIcon(cat)} {cat}
        </button>
      ))}
    </div>
  )
}

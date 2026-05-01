import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl font-mono font-bold text-green-500/20 mb-4">404</div>
        <div className="text-4xl mb-4">🛡️</div>
        <h1 className="text-2xl font-mono font-bold text-gray-200 mb-2">Access Denied</h1>
        <p className="text-gray-500 font-mono text-sm mb-8">This sector doesn't exist in our network.</p>
        <Link to="/dashboard" className="px-6 py-3 bg-green-500 text-black font-mono font-bold rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20">
          ← Return to Base
        </Link>
      </div>
    </div>
  )
}

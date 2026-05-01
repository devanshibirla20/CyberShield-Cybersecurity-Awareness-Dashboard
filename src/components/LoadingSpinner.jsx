import React from 'react'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-5">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-green-900/30" />
        <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent" style={{animation:'spin 0.9s linear infinite'}} />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">🛡️</div>
      </div>
      <p className="font-mono text-sm text-green-400/80 animate-pulse">{message}</p>
    </div>
  )
}

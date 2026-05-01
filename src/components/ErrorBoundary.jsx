import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, msg: '' }

  static getDerivedStateFromError(err) { return { hasError: true, msg: err.message } }
  componentDidCatch(err, info) { console.error('ErrorBoundary:', err, info) }

  render() {
    if (this.state.hasError) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-mono font-bold text-red-400 mb-2">System Error</h1>
          <p className="text-gray-400 mb-6 font-mono text-sm">{this.state.msg || 'Unexpected error'}</p>
          <button
            onClick={() => this.setState({ hasError: false, msg: '' })}
            className="px-6 py-3 bg-green-500 text-black font-mono font-bold rounded-xl hover:bg-green-400 transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    )
    return this.props.children
  }
}

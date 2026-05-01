import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, signup } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname ?? '/dashboard'

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = () => {
    setError('')
    try {
      login('demo@cybershield.io', 'demo1234')
      navigate('/dashboard')
    } catch {
      try {
        signup('Demo User', 'demo@cybershield.io', 'demo1234')
        navigate('/dashboard')
      } catch (err2) {
        setError(err2.message)
      }
    }
  }

  const inp = `w-full px-4 py-3 rounded-xl font-mono text-sm bg-gray-900 border border-gray-700
    text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40
    focus:border-green-600 transition-all`

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12 relative">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(34,197,94,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.03) 1px,transparent 1px)', backgroundSize:'56px 56px' }} />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-3">
              <span className="text-3xl">🛡️</span>
            </div>
            <h1 className="text-2xl font-mono font-bold text-gray-100">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">Sign in to CyberShield</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="agent@cybershield.io" className={inp} />
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
              <input type="password" name="password" value={form.password} onChange={onChange} required placeholder="••••••••" className={inp} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl font-mono font-bold text-sm bg-green-500 text-black hover:bg-green-400 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
            >
              {loading ? '🔄 Authenticating...' : '🔐 Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600 font-mono">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Demo button */}
          <button
            onClick={handleDemo}
            className="w-full py-2.5 rounded-xl font-mono text-sm text-gray-300 border border-gray-700 hover:border-green-700 hover:text-green-400 transition-all duration-200"
          >
            ⚡ Try Demo Account
          </button>

          <p className="text-center text-sm text-gray-600 font-mono mt-5">
            New agent?{' '}
            <Link to="/signup" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Create Account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

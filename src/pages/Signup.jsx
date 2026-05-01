import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate   = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const validate = () => {
    if (form.name.trim().length < 2)    return 'Name must be at least 2 characters'
    if (!form.email.includes('@'))       return 'Enter a valid email'
    if (form.password.length < 6)       return 'Password must be at least 6 characters'
    if (form.password !== form.confirm) return 'Passwords do not match'
    return null
  }

  const handleSubmit = e => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    try {
      signup(form.name.trim(), form.email, form.password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inp = `w-full px-4 py-3 rounded-xl font-mono text-sm bg-gray-900 border border-gray-700
    text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40
    focus:border-green-600 transition-all`
  const lbl = `block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider mb-1.5`

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(34,197,94,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.03) 1px,transparent 1px)', backgroundSize:'56px 56px' }} />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-3">
              <span className="text-3xl">🛡️</span>
            </div>
            <h1 className="text-2xl font-mono font-bold text-gray-100">Join CyberShield</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">Create your agent profile</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className={lbl}>Full Name</label><input type="text" name="name" value={form.name} onChange={onChange} required placeholder="John Doe" className={inp} /></div>
            <div><label className={lbl}>Email</label><input type="email" name="email" value={form.email} onChange={onChange} required placeholder="agent@cybershield.io" className={inp} /></div>
            <div><label className={lbl}>Password</label><input type="password" name="password" value={form.password} onChange={onChange} required placeholder="Min. 6 characters" className={inp} /></div>
            <div><label className={lbl}>Confirm Password</label><input type="password" name="confirm" value={form.confirm} onChange={onChange} required placeholder="Repeat password" className={inp} /></div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl font-mono font-bold text-sm bg-green-500 text-black hover:bg-green-400 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
            >
              {loading ? '🔄 Creating...' : '🚀 Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 font-mono mt-5">
            Already an agent?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">Sign In →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

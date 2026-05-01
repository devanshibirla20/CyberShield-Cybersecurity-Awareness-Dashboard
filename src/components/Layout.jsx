import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-800 mt-16 py-6">
        <p className="text-center text-xs font-mono text-gray-600">
          🛡️ Devanshi Birla &copy; {new Date().getFullYear()} — Stay Secure, Stay Informed
        </p>
      </footer>
    </div>
  )
}

import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ThemeProvider }    from './context/ThemeContext'
import { AuthProvider }     from './context/AuthContext'
import { BookmarkProvider } from './context/BookmarkContext'

import ErrorBoundary  from './components/ErrorBoundary'
import Layout         from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'

const Login     = lazy(() => import('./pages/Login'))
const Signup    = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const News      = lazy(() => import('./pages/News'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const Profile   = lazy(() => import('./pages/Profile'))
const NotFound  = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <LoadingSpinner message="Loading module..." />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BookmarkProvider>
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public */}
                  <Route path="/login"  element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Protected — wrapped in Layout (Navbar + footer) */}
                  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route index          element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="news"      element={<News />} />
                    <Route path="bookmarks" element={<Bookmarks />} />
                    <Route path="profile"   element={<Profile />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </BookmarkProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

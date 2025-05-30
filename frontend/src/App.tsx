import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load components
const DailySchedule = lazy(() => import('./pages/DailySchedule'))
const WeeklyPlanner = lazy(() => import('./pages/WeeklyPlanner'))
const UserManager = lazy(() => import('./pages/UserManager'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-primary-600">Motion</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/" className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Daily Schedule
                  </a>
                  <a href="/weekly" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Weekly Planner
                  </a>
                  <a href="/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    User Manager
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<DailySchedule />} />
              <Route path="/weekly" element={<WeeklyPlanner />} />
              <Route path="/users" element={<UserManager />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App 
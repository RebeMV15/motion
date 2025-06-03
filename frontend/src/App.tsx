import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Suspense, lazy } from 'react'
// import { TestConnection } from './components/TestConnection'

// Lazy load components
const DailySchedule = lazy(() => import('./pages/DailySchedule'))
const GroupConfigurator = lazy(() => import('./pages/GroupConfigurator'))
const UserManager = lazy(() => import('./pages/UserManager'))
const SessionDetail = () => <div>Session Detail Page (to be implemented)</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* <TestConnection /> */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-primary-600">Motion</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    Daily Schedule
                  </NavLink>
                  <NavLink
                    to="/weekly"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    Group Configurator
                  </NavLink>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    User Manager
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<DailySchedule />} />
              <Route path="/weekly" element={<GroupConfigurator />} />
              <Route path="/users" element={<UserManager />} />
              <Route path="/session/:id" element={<SessionDetail />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App 
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Layout, Menu, Button } from 'antd'
import { CalendarOutlined, TeamOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons'
// import { TestConnection } from './components/TestConnection'

// Lazy load components
const DailySchedule = lazy(() => import('./pages/DailySchedule'))
const GroupConfigurator = lazy(() => import('./pages/GroupConfigurator'))
const UserManager = lazy(() => import('./pages/UserManager'))
const SessionDetail = lazy(() => import('./pages/SessionDetail'))

const { Header } = Layout;

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const items = [
      {
        key: '/',
        icon: <CalendarOutlined />,
        label: 'Daily Schedule',
      },
      {
        key: '/weekly',
        icon: <TeamOutlined />,
        label: 'Group Configurator',
      },
      {
        key: '/users',
        icon: <SettingOutlined />,
        label: 'User Manager',
      },
    ];

    return (
      <>
        {/* Desktop Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
          style={{
            borderBottom: 'none',
            backgroundColor: 'transparent',
            lineHeight: '64px',
            flex: 1
          }}
          className="hidden sm:flex"
        />

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden"
          style={{ marginLeft: 'auto' }}
        />

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={items}
            onClick={({ key }) => {
              navigate(key);
              setIsMobileMenuOpen(false);
            }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }}
            className="sm:hidden"
          />
        )}
      </>
    );
  };

  return (
    <Router>
      <Layout className="min-h-screen bg-[#f5f5f5]">
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          height: '64px',
          position: 'relative'
        }}>
          <div className="flex items-center w-full">
            <img src="/logo-motion.svg" alt="Motion" style={{ height: '24px', marginRight: '32px' }} />
            <Navigation />
          </div>
        </Header>

        <Layout.Content 
          style={{ 
            padding: '16px 8px', 
            maxWidth: '1280px', 
            margin: '0 auto', 
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<DailySchedule />} />
              <Route path="/weekly" element={<GroupConfigurator />} />
              <Route path="/users" element={<UserManager />} />
              <Route path="/session/:id" element={<SessionDetail />} />
            </Routes>
          </Suspense>
        </Layout.Content>
      </Layout>
    </Router>
  )
}

export default App 
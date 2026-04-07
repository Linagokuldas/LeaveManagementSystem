import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard'
import TeamLeadDashboard from '../components/dashboards/TeamLeadDashboard'
import HRDashboard from '../components/dashboards/HRDashboard'
import ManagerDashboard from '../components/dashboards/ManagerDashboard'
import CEODashboard from '../components/dashboards/CEODashboard'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'EMPLOYEE':
        return <EmployeeDashboard />
      case 'TEAM_LEAD':
        return <TeamLeadDashboard />
      case 'HR':
        return <HRDashboard />
      case 'MANAGER':
        return <ManagerDashboard />
      case 'CEO':
        return <CEODashboard />
      default:
        return <EmployeeDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user}
        onLogout={handleLogout}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Navbar 
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
        
        <main className="p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  )
}

export default Dashboard

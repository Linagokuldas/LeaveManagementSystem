import React, { useState, useEffect } from 'react'
import LeaveRequestsTable from '../LeaveRequestsTable'
import { leaveService } from '../../services/leaveService'
import { Briefcase, Calendar, CheckCircle, XCircle, Users } from 'lucide-react'

const HRDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([])
  const [allRequests, setAllRequests] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [pendingRes, allRes, statsRes] = await Promise.all([
        leaveService.getPendingRequests('HR'),
        leaveService.getMyRequests(),
        leaveService.getDashboardStats()
      ])
      
      setPendingRequests(pendingRes.data)
      setAllRequests(allRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleActionComplete = () => {
    fetchData()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'pending'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending Approvals
        </button>
        <button
          onClick={() => setActiveTab('all-requests')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'all-requests'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All Requests
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Your Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Your Approval</h3>
            <LeaveRequestsTable 
              requests={pendingRequests} 
              showActions={true}
              onActionComplete={handleActionComplete}
            />
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Your Approval</h3>
          <LeaveRequestsTable 
            requests={pendingRequests} 
            showActions={true}
            onActionComplete={handleActionComplete}
          />
        </div>
      )}

      {activeTab === 'all-requests' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Leave Requests</h3>
          <LeaveRequestsTable 
            requests={allRequests} 
            showActions={false}
            onActionComplete={handleActionComplete}
          />
        </div>
      )}
    </div>
  )
}

export default HRDashboard

import React, { useState, useEffect } from 'react'
import LeaveApplicationForm from '../LeaveApplicationForm'
import LeaveRequestsTable from '../LeaveRequestsTable'
import { leaveService } from '../../services/leaveService'
import { Briefcase, Calendar, CheckCircle, XCircle } from 'lucide-react'

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [myRequests, setMyRequests] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'my-leaves') {
      fetchMyRequests()
    }
  }, [activeTab])

  const fetchMyRequests = async () => {
    try {
      const [requestsRes, statsRes] = await Promise.all([
        leaveService.getMyRequests(),
        leaveService.getDashboardStats()
      ])
      
      setMyRequests(requestsRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveApplied = () => {
    fetchMyRequests()
    setActiveTab('my-leaves')
  }

  const handleActionComplete = () => {
    fetchMyRequests()
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
          onClick={() => setActiveTab('apply-leave')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'apply-leave'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Apply Leave
        </button>
        <button
          onClick={() => setActiveTab('my-leaves')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'my-leaves'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          My Leave History
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
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h3>
            <LeaveRequestsTable 
              requests={myRequests.slice(0, 5)} 
              showActions={false}
              onActionComplete={handleActionComplete}
            />
          </div>
        </div>
      )}

      {activeTab === 'apply-leave' && (
        <LeaveApplicationForm onLeaveApplied={handleLeaveApplied} />
      )}

      {activeTab === 'my-leaves' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Leave History</h3>
          <LeaveRequestsTable 
            requests={myRequests} 
            showActions={false}
            onActionComplete={handleActionComplete}
          />
        </div>
      )}
    </div>
  )
}

export default EmployeeDashboard

import React, { useState } from 'react'
import { leaveService } from '../services/leaveService'
import { CheckCircle, XCircle, Calendar, User, Search, Filter } from 'lucide-react'

const LeaveRequestsTable = ({ requests, showActions, onActionComplete }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [loading, setLoading] = useState(false)

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || request.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleApprove = async (id) => {
    setLoading(true)
    try {
      await leaveService.approveLeave(id)
      onActionComplete()
    } catch (error) {
      console.error('Error approving leave:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (id) => {
    setLoading(true)
    try {
      await leaveService.rejectLeave(id)
      onActionComplete()
    } catch (error) {
      console.error('Error rejecting leave:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "badge"
    switch (status) {
      case 'PENDING':
        return `${baseClasses} badge-pending`
      case 'APPROVED':
        return `${baseClasses} badge-approved`
      case 'REJECTED':
        return `${baseClasses} badge-rejected`
      default:
        return baseClasses
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const getLeaveTypeLabel = (type) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  const getApprovalLevelLabel = (level) => {
    return level.replace('_', ' ')
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-gray-500">No leave requests found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.user.name}</div>
                      <div className="text-xs text-gray-500">{request.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(request.fromDate)} – {formatDate(request.toDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.totalDays}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {getLeaveTypeLabel(request.leaveType)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {request.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(request.status)}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getApprovalLevelLabel(request.currentLevel)}
                </td>
                {showActions && request.status === 'PENDING' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={loading}
                        className="btn btn-success btn-sm flex items-center space-x-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={loading}
                        className="btn btn-danger btn-sm flex items-center space-x-1"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>
                )}
                {showActions && request.status !== 'PENDING' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRequests.length === 0 && requests.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No requests match your search criteria</p>
        </div>
      )}
    </div>
  )
}

export default LeaveRequestsTable

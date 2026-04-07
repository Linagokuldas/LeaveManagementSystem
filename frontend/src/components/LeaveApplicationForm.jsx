import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { leaveService } from '../services/leaveService'
import { Calendar, FileText, Send } from 'lucide-react'

const LeaveApplicationForm = ({ onLeaveApplied }) => {
  const [formData, setFormData] = useState({
    fromDate: null,
    toDate: null,
    leaveType: 'SICK_LEAVE',
    reason: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalDays, setTotalDays] = useState(0)

  const leaveTypes = [
    { value: 'SICK_LEAVE', label: 'Sick Leave' },
    { value: 'CASUAL_LEAVE', label: 'Casual Leave' },
    { value: 'ANNUAL_LEAVE', label: 'Annual Leave' },
    { value: 'MATERNITY_LEAVE', label: 'Maternity Leave' },
    { value: 'PATERNITY_LEAVE', label: 'Paternity Leave' },
    { value: 'EMERGENCY_LEAVE', label: 'Emergency Leave' },
    { value: 'UNPAID_LEAVE', label: 'Unpaid Leave' }
  ]

  const calculateDays = (from, to) => {
    if (from && to) {
      const diffTime = Math.abs(to - from)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      setTotalDays(diffDays)
    } else {
      setTotalDays(0)
    }
  }

  const handleDateChange = (field, date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }))

    if (field === 'fromDate') {
      calculateDays(date, formData.toDate)
    } else {
      calculateDays(formData.fromDate, date)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.fromDate || !formData.toDate) {
      setError('Please select both from and to dates')
      setLoading(false)
      return
    }

    if (formData.fromDate > formData.toDate) {
      setError('From date cannot be after to date')
      setLoading(false)
      return
    }

    if (!formData.reason.trim()) {
      setError('Please provide a reason for leave')
      setLoading(false)
      return
    }

    try {
      const leaveData = {
        fromDate: formData.fromDate.toISOString().split('T')[0],
        toDate: formData.toDate.toISOString().split('T')[0],
        leaveType: formData.leaveType,
        reason: formData.reason
      }

      await leaveService.applyLeave(leaveData)
      onLeaveApplied()
      
      setFormData({
        fromDate: null,
        toDate: null,
        leaveType: 'SICK_LEAVE',
        reason: ''
      })
      setTotalDays(0)
    } catch (error) {
      setError('Failed to apply for leave. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Apply for Leave</h2>
          <p className="text-sm text-gray-600">Fill in the details below to submit your leave request</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.fromDate}
                onChange={(date) => handleDateChange('fromDate', date)}
                selectsStart
                startDate={formData.fromDate}
                endDate={formData.toDate}
                minDate={new Date()}
                className="input"
                placeholderText="Select start date"
                dateFormat="dd/MM/yyyy"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.toDate}
                onChange={(date) => handleDateChange('toDate', date)}
                selectsEnd
                startDate={formData.fromDate}
                endDate={formData.toDate}
                minDate={formData.fromDate}
                className="input"
                placeholderText="Select end date"
                dateFormat="dd/MM/yyyy"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {totalDays > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-800">
              Total Leave Days: <span className="font-bold">{totalDays}</span>
            </p>
          </div>
        )}

        <div>
          <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-2">
            Leave Type
          </label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="input"
          >
            {leaveTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Leave <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={4}
            value={formData.reason}
            onChange={handleChange}
            placeholder="Please provide a detailed reason for your leave request..."
            className="input resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setFormData({
              fromDate: null,
              toDate: null,
              leaveType: 'SICK_LEAVE',
              reason: ''
            })}
            className="btn btn-secondary"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span>{loading ? 'Submitting...' : 'Submit Request'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default LeaveApplicationForm

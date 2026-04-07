import api from './authService'

export const leaveService = {
  applyLeave: (leaveData) => api.post('/leave/apply', leaveData),
  getMyRequests: () => api.get('/leave/my-requests'),
  getPendingRequests: (role) => api.get(`/leave/pending/${role}`),
  approveLeave: (id) => api.put(`/leave/approve/${id}`),
  rejectLeave: (id) => api.put(`/leave/reject/${id}`),
  getDashboardStats: () => api.get('/leave/dashboard-stats'),
}

import React from 'react'
import { 
  Briefcase, 
  Calendar, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose, user, onLogout }) => {
  const getRoleBasedMenu = () => {
    const baseMenu = [
      { icon: BarChart3, label: 'Dashboard', active: true },
      { icon: Calendar, label: 'My Leaves', active: false },
    ]

    if (user?.role === 'EMPLOYEE') {
      return [
        ...baseMenu,
        { icon: FileText, label: 'Apply Leave', active: false },
      ]
    }

    const approvalMenu = [
      { icon: Users, label: 'Pending Approvals', active: false },
      { icon: FileText, label: 'All Requests', active: false },
    ]

    return [...baseMenu, ...approvalMenu]
  }

  const menuItems = getRoleBasedMenu()

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`sidebar fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">LeaveMS</span>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-6">
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-sm font-medium text-gray-600">Logged in as</p>
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>

          <div className="space-y-1 px-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar

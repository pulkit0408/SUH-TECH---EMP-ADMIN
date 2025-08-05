import {
  BarChart3,
  Calendar,
  CheckSquare,
  Clock,
  LayoutDashboard,
  LogOut,
  Settings,
  UserPlus,
  Users,
  X
} from 'lucide-react';

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  userRole,
  currentUser,
  handleLogout
}) => {
  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'team-lead', 'emp'] },
    { id: 'employees', icon: Users, label: 'Employees', roles: ['admin', 'team-lead'] },
    { id: 'attendance', icon: Clock, label: 'Attendance', roles: ['admin', 'team-lead', 'emp'] },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks', roles: ['admin', 'team-lead', 'emp'] },
    { id: 'leads', icon: UserPlus, label: 'Leads', roles: ['admin', 'team-lead'] },
    { id: 'leaves', icon: Calendar, label: 'Leave Management', roles: ['admin', 'team-lead', 'emp'] },
    { id: 'reports', icon: BarChart3, label: 'Reports', roles: ['admin', 'team-lead'] },
    { id: 'settings', icon: Settings, label: 'Settings', roles: ['admin', 'team-lead', 'emp'] }
  ];

  const filteredSidebarItems = sidebarItems.filter(item => item.roles.includes(userRole));

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-green-100 transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } w-64`}>
      <div className="p-6 border-b border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">EMS Dashboard</h2>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredSidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

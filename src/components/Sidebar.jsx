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
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen, currentUser }) => {
  const { pathname } = useLocation();
  const userRole = 'admin'; // You can fetch from localStorage/context

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'employees', label: 'Employees', icon: Users, path: '/employees', roles: ['admin', 'team-lead'] },
    { id: 'attendance', label: 'Attendance', icon: Clock, path: '/attendance' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { id: 'leads', label: 'Leads', icon: UserPlus, path: '/leads' },
    { id: 'leaves', label: 'Leave Management', icon: Calendar, path: '/leaves' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const filteredItems = sidebarItems.filter(item => !item.roles || item.roles.includes(userRole));

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-green-100 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
      <div className="p-6 border-b border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">EMS Dashboard</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredItems.map(item => {
          const isActive = pathname === item.path;
          return (
            <Link to={item.path} key={item.id}>
              <div className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-100 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
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
        <button className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => window.location.href = '/login'}>
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

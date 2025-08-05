import {
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  CheckSquare,
  Clock,
  Edit,
  Eye,
  Filter,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState('admin'); // This would come from localStorage/context
  const [currentUser, setCurrentUser] = useState({ name: 'John Admin', email: 'admin@company.com' });

  // Mock data - in real app, this would come from API calls
  const [dashboardStats, setDashboardStats] = useState({
    totalEmployees: 45,
    presentToday: 38,
    onLeave: 5,
    pendingTasks: 12,
    newLeads: 8,
    pendingLeaves: 3
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'attendance', message: 'Sarah Wilson checked in', time: '9:15 AM' },
    { id: 2, type: 'leave', message: 'Mike Johnson requested leave', time: '8:30 AM' },
    { id: 3, type: 'task', message: 'Task "Update Documentation" completed', time: '8:00 AM' },
    { id: 4, type: 'lead', message: 'New lead assigned to team', time: '7:45 AM' }
  ]);

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

  const handleLogout = () => {
    // Clear localStorage and redirect
    window.location.href = '/login';
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          color="bg-blue-500"
          trend="5"
        />
        <StatCard
          icon={CheckCircle}
          title="Present Today"
          value={dashboardStats.presentToday}
          color="bg-green-500"
          trend="2"
        />
        <StatCard
          icon={Calendar}
          title="On Leave"
          value={dashboardStats.onLeave}
          color="bg-yellow-500"
        />
        <StatCard
          icon={AlertTriangle}
          title="Pending Tasks"
          value={dashboardStats.pendingTasks}
          color="bg-red-500"
        />
      </div>

      {/* Recent Activities & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{activity.message}</span>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
              <Clock className="w-8 h-8 text-green-600 mb-2" />
              <p className="font-medium text-gray-800">Mark Attendance</p>
              <p className="text-gray-500 text-sm">Check in/out</p>
            </button>
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <CheckSquare className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-medium text-gray-800">View Tasks</p>
              <p className="text-gray-500 text-sm">Pending work</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-left">
              <Calendar className="w-8 h-8 text-yellow-600 mb-2" />
              <p className="font-medium text-gray-800">Request Leave</p>
              <p className="text-gray-500 text-sm">Apply for time off</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <UserPlus className="w-8 h-8 text-purple-600 mb-2" />
              <p className="font-medium text-gray-800">New Lead</p>
              <p className="text-gray-500 text-sm">Add prospect</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EmployeesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-green-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Mock employee data */}
              {[
                { id: 1, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'team-lead', status: 'active', leaveCount: 2 },
                { id: 2, name: 'Mike Johnson', email: 'mike@company.com', role: 'emp', status: 'active', leaveCount: 5 },
                { id: 3, name: 'Emily Davis', email: 'emily@company.com', role: 'emp', status: 'on-leave', leaveCount: 1 }
              ].map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      employee.role === 'team-lead' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.leaveCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'employees':
        return <EmployeesContent />;
      case 'attendance':
        return <div className="text-center py-20"><Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Attendance Management Coming Soon</p></div>;
      case 'tasks':
        return <div className="text-center py-20"><CheckSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Task Management Coming Soon</p></div>;
      case 'leads':
        return <div className="text-center py-20"><UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Lead Management Coming Soon</p></div>;
      case 'leaves':
        return <div className="text-center py-20"><Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Leave Management Coming Soon</p></div>;
      case 'reports':
        return <div className="text-center py-20"><BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Reports Coming Soon</p></div>;
      case 'settings':
        return <div className="text-center py-20"><Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">Settings Coming Soon</p></div>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className={`transition-margin duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-green-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:block">
                <p className="text-gray-600">Welcome back, {currentUser.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

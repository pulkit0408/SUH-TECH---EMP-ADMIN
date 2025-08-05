import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  CheckSquare,
  Clock,
  PlusCircle,
  TrendingUp,
  UserPlus,
  Users
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
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

  return (
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
};

export default Dashboard;

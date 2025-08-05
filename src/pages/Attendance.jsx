import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Timer,
  User,
  XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

const AttendancePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState(null); // null, 'checked-in', 'checked-out'
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [location, setLocation] = useState('Office - Main Building');
  const [isLoading, setIsLoading] = useState(false);

  // Mock employee data - in real app, this would come from auth context
  const employee = {
    id: '507f1f77bcf86cd799439011',
    name: 'John Smith',
    employeeId: 'EMP001',
    department: 'Software Development',
    shift: '9:00 AM - 6:00 PM'
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      setCheckInTime(now);
      setAttendanceStatus('checked-in');
      setIsLoading(false);
    }, 1500);
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      setCheckOutTime(now);
      setAttendanceStatus('checked-out');
      setIsLoading(false);
    }, 1500);
  };

  const calculateWorkingHours = () => {
    if (checkInTime && checkOutTime) {
      const diff = checkOutTime - checkInTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    }
    return '0h 0m';
  };

  const getStatusColor = () => {
    switch (attendanceStatus) {
      case 'checked-in':
        return 'text-green-600 bg-green-50';
      case 'checked-out':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Mark Attendance</h1>
          </div>
          <div className="text-right">
            <p className="text-gray-600">{formatDate(currentTime)}</p>
            <p className="text-2xl font-bold text-gray-800">{formatTime(currentTime)}</p>
          </div>
        </div>

        {/* Employee Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{employee.name}</h2>
              <p className="text-gray-600">ID: {employee.employeeId}</p>
              <p className="text-gray-600">{employee.department}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Shift Time</p>
              <p className="font-semibold text-gray-800">{employee.shift}</p>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Attendance</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {attendanceStatus === 'checked-in' && 'Checked In'}
              {attendanceStatus === 'checked-out' && 'Checked Out'}
              {!attendanceStatus && 'Not Marked'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Check In */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 mb-1">Check In</p>
              <p className="text-lg font-semibold text-gray-800">
                {checkInTime ? formatTime(checkInTime) : '--:--'}
              </p>
            </div>

            {/* Check Out */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Timer className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-1">Check Out</p>
              <p className="text-lg font-semibold text-gray-800">
                {checkOutTime ? formatTime(checkOutTime) : '--:--'}
              </p>
            </div>

            {/* Working Hours */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-gray-600 mb-1">Working Hours</p>
              <p className="text-lg font-semibold text-gray-800">{calculateWorkingHours()}</p>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-gray-600">Current Location</p>
              <p className="font-semibold text-gray-800">{location}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {!attendanceStatus && (
            <button
              onClick={handleCheckIn}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>Check In</span>
                </>
              )}
            </button>
          )}

          {attendanceStatus === 'checked-in' && (
            <button
              onClick={handleCheckOut}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  <span>Check Out</span>
                </>
              )}
            </button>
          )}

          {attendanceStatus === 'checked-out' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">Attendance Complete</h3>
              <p className="text-green-700">You have successfully marked your attendance for today.</p>
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-yellow-800 font-medium">Important Notice</p>
              <p className="text-yellow-700 text-sm mt-1">
                Please ensure you are within the office premises when marking attendance.
                Late check-ins may require manager approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;

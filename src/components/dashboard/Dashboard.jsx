import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  QrCode, 
  Users, 
  Calendar, 
  BarChart3, 
  Clock, 
  LogOut,
  Plus,
  Search,
  Filter,
  Building2,
  GraduationCap
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  const [classes] = useState([
    {
      id: 1,
      name: 'Introduction to Computer Science',
      subject: 'CS101',
      schedule: 'Mon, Wed, Fri 9:00 AM',
      totalStudents: 45,
      presentToday: 38,
      attendancePercentage: 84,
      room: 'Room 201'
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      subject: 'CS201',
      schedule: 'Tue, Thu 10:30 AM',
      totalStudents: 32,
      presentToday: 28,
      attendancePercentage: 88,
      room: 'Room 205'
    },
    {
      id: 3,
      name: 'Web Development Fundamentals',
      subject: 'CS301',
      schedule: 'Mon, Wed 2:00 PM',
      totalStudents: 28,
      presentToday: 25,
      attendancePercentage: 89,
      room: 'Room 203'
    }
  ]);

  const [todayStats] = useState({
    totalClasses: 3,
    totalStudents: 105,
    totalPresent: 91,
    totalAbsent: 14,
    averageAttendance: 87
  });

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high' && cls.attendancePercentage >= 85) ||
                         (filterStatus === 'medium' && cls.attendancePercentage >= 70 && cls.attendancePercentage < 85) ||
                         (filterStatus === 'low' && cls.attendancePercentage < 70);
    
    return matchesSearch && matchesFilter;
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (percentage >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  QR Attendance System
                </h1>
                <p className="text-slate-600">
                  Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        {/* Today's Summary */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              Today's Summary
            </h2>
            <div className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Classes Today</p>
                  <p className="text-3xl font-bold text-slate-900">{todayStats.totalClasses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Students</p>
                  <p className="text-3xl font-bold text-slate-900">{todayStats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Present Today</p>
                  <p className="text-3xl font-bold text-emerald-600">{todayStats.totalPresent}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Absent Today</p>
                  <p className="text-3xl font-bold text-red-600">{todayStats.totalAbsent}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Avg. Attendance</p>
                  <p className="text-3xl font-bold text-indigo-600">{todayStats.averageAttendance}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">
                My Classes
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Classes</option>
                <option value="high">High Attendance (≥85%)</option>
                <option value="medium">Medium Attendance (70-84%)</option>
                <option value="low">Low Attendance (&lt;70%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {cls.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-lg">{cls.subject}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getAttendanceColor(cls.attendancePercentage)}`}>
                      {cls.attendancePercentage}%
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="font-medium">{cls.schedule}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="font-medium">{cls.totalStudents} students • {cls.presentToday} present today</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Clock className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="font-medium">{cls.room}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/scanner/${cls.id}`)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Start Scanning
                    </button>
                    <button
                      onClick={() => navigate(`/attendance/${cls.id}`)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-slate-200"
                    >
                      View Attendance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No classes found</h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

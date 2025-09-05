import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Camera,
  Users,
  Clock,
  Building2,
  QrCode
} from 'lucide-react';

const QRScanner = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualSearch, setManualSearch] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [recentScans, setRecentScans] = useState([]);

  // Mock class data - replace with API call
  const [classData] = useState({
    id: classId,
    name: 'Introduction to Computer Science',
    subject: 'CS101',
    totalStudents: 45,
    presentToday: 38
  });

  // Mock students data - replace with API call
  const [students] = useState([
    { id: '2023001', name: 'Juan Dela Cruz', status: 'present', timeScanned: '09:15 AM' },
    { id: '2023002', name: 'Maria Santos', status: 'present', timeScanned: '09:12 AM' },
    { id: '2023003', name: 'Pedro Garcia', status: 'absent' },
    { id: '2023004', name: 'Ana Lopez', status: 'present', timeScanned: '09:18 AM' },
    { id: '2023005', name: 'Carlos Rodriguez', status: 'late', timeScanned: '09:25 AM' }
  ]);

  useEffect(() => {
    initializeScanner();
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, []);

  const initializeScanner = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
        formatsToSupport: [ "QR_CODE" ]
      },
      false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    setScanner(html5QrcodeScanner);
    setIsScanning(true);
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    // Simulate QR code processing
    const studentId = decodedText;
    const student = students.find(s => s.id === studentId);
    
    if (student) {
      if (student.status === 'present' || student.status === 'late') {
        toast.error('Student already scanned today!', {
          icon: '⚠️',
          style: {
            background: '#FEF3C7',
            color: '#92400E',
          },
        });
      } else {
        // Mark as present
        const updatedStudent = {
          ...student,
          status: 'present',
          timeScanned: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })
        };
        
        setRecentScans(prev => [updatedStudent, ...prev.slice(0, 4)]);
        
        toast.success(`Attendance marked for ${student.name} (ID: ${student.id})`, {
          icon: '✅',
          style: {
            background: '#D1FAE5',
            color: '#065F46',
          },
        });
      }
    } else {
      toast.error('Invalid QR code or student not enrolled in this class', {
        icon: '❌',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
        },
      });
    }
  };

  const onScanFailure = (error) => {
    // Handle scan failure silently
    console.warn(`QR scan error = ${error}`);
  };

  const handleManualAttendance = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      const updatedStudent = {
        ...student,
        status: 'present',
        timeScanned: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };
      
      setRecentScans(prev => [updatedStudent, ...prev.slice(0, 4)]);
      
      toast.success(`Manual attendance marked for ${student.name}`, {
        icon: '✅',
      });
      
      setManualSearch('');
      setShowManualForm(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(manualSearch.toLowerCase()) ||
    student.id.includes(manualSearch)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'absent': return 'text-red-600 bg-red-50 border-red-200';
      case 'late': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                  QR Scanner - {classData.name}
                </h1>
              </div>
              <p className="text-slate-600">
                {classData.totalStudents} students • {classData.presentToday} present today
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowManualForm(!showManualForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Users className="h-4 w-4" />
                <span>Manual Entry</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Scanner */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <Camera className="h-7 w-7 mr-3 text-blue-600" />
                  QR Code Scanner
                </h2>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-slate-600">
                    {isScanning ? 'Scanning...' : 'Stopped'}
                  </span>
                </div>
              </div>

              <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
                <div id="qr-reader" className="w-full min-h-[400px]"></div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="border-4 border-blue-400 rounded-2xl m-8 animate-pulse shadow-2xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4 text-lg">Scan Instructions:</h3>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Position the QR code within the scanning area
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Hold steady for 1-2 seconds
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Wait for confirmation message
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Scanner will auto-ready for next student
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Scans */}
            {recentScans.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  Recent Scans
                </h3>
                <div className="space-y-4">
                  {recentScans.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{scan.name}</p>
                          <p className="text-sm text-slate-600">ID: {scan.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-600">Present</p>
                        <p className="text-xs text-slate-500">{scan.timeScanned}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Manual Attendance */}
            {showManualForm && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  Manual Attendance Entry
                </h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={manualSearch}
                    onChange={(e) => setManualSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-sm text-slate-600">ID: {student.id}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                        {student.status === 'absent' && (
                          <button
                            onClick={() => handleManualAttendance(student.id)}
                            className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Mark Present
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Class Statistics */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Building2 className="h-6 w-6 text-blue-600 mr-3" />
                Class Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Total Students:</span>
                  <span className="font-bold text-slate-900">{classData.totalStudents}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Present Today:</span>
                  <span className="font-bold text-emerald-600">{classData.presentToday}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Absent Today:</span>
                  <span className="font-bold text-red-600">{classData.totalStudents - classData.presentToday}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Attendance Rate:</span>
                  <span className="font-bold text-blue-600">
                    {Math.round((classData.presentToday / classData.totalStudents) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/attendance/${classId}`)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 border border-slate-200 font-medium"
                >
                  <Users className="h-4 w-4" />
                  <span>View Full Attendance</span>
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 border border-slate-200 font-medium"
                >
                  <Clock className="h-4 w-4" />
                  <span>View Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;

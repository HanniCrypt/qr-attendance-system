import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('qrAttendanceUser');
    const savedRememberMe = localStorage.getItem('qrAttendanceRememberMe');
    
    if (savedUser && savedRememberMe === 'true') {
      setUser(JSON.parse(savedUser));
      setRememberMe(true);
    }
    
    setLoading(false);
  }, []);

  // Auto logout after inactivity (30 minutes)
  useEffect(() => {
    if (!user) return;

    const inactivityTimeout = 30 * 60 * 1000; // 30 minutes
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        toast.error('Session expired due to inactivity');
      }, inactivityTimeout);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
    };
  }, [user]);

  const login = async (email, password, remember = false) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual backend integration
      if (email === 'faculty@example.com' && password === 'password123') {
        const userData = {
          id: 1,
          name: 'Dr. John Smith',
          email: email,
          role: 'faculty',
          department: 'Computer Science'
        };

        setUser(userData);
        setRememberMe(remember);

        if (remember) {
          localStorage.setItem('qrAttendanceUser', JSON.stringify(userData));
          localStorage.setItem('qrAttendanceRememberMe', 'true');
        }

        toast.success('Login successful!');
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRememberMe(false);
    localStorage.removeItem('qrAttendanceUser');
    localStorage.removeItem('qrAttendanceRememberMe');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    rememberMe,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

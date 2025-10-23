import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell,
  FiUser,
  FiArrowUp,
  FiArrowDown,
  FiDownload,
  FiUpload,
  FiClock,
  FiChevronDown,
  FiCheckCircle,
  FiMenu,
  FiActivity, 
  FiAlertTriangle,
  FiLogOut
} from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
      if (notificationsDropdownOpen && !event.target.closest('.notifications-dropdown')) {
        setNotificationsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen, notificationsDropdownOpen]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:3000/auth/', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 201 && response.data.user) {
        setUserData(response.data.user);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setUserData({
        username: "Error Loading Data",
        email: "Please check connection",
        plan: "Unknown"
      });
    }
  };

  const checkAuthAndFetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      await fetchUserData();
      
    } catch (error) {
      console.error('Auth check failed:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  // Mock data
  const usageStats = {
    download: 245.6,
    upload: 78.3,
    latency: 12,
    dataRemaining: 675.5
  };

  const recentActivity = [
    { id: 1, type: 'download', amount: '45.2 GB', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'streaming', amount: '12.8 GB', time: '4 hours ago', status: 'completed' },
    { id: 3, type: 'upload', amount: '8.1 GB', time: '6 hours ago', status: 'completed' },
    { id: 4, type: 'gaming', amount: '3.2 GB', time: '8 hours ago', status: 'completed' }
  ];

  const serviceAlerts = [
    { id: 1, type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '5 hours ago' },
    { id: 2, type: 'success', message: 'Your connection speed has been upgraded', time: '1 day ago' }
  ];

  useEffect(() => {
    if (userData && userData.username !== "Error Loading Data") {
      setNotifications([
        { id: 1, type: 'bill', message: 'Monthly bill ready', read: false },
        { id: 2, type: 'usage', message: "You've used 80% of your data", read: false },
        { id: 3, type: 'maintenance', message: 'Network maintenance scheduled', read: true }
      ]);
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    setNotificationsDropdownOpen(false);
  };

  const DataUsageMeter = ({ used, total, label }) => {
    const percentage = (used / total) * 100;
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">{label}</h3>
          <span className="text-cyan-400 font-bold">{used} GB / {total} GB</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            className={`h-3 rounded-full ${
              percentage > 90 ? 'bg-red-500' : 
              percentage > 75 ? 'bg-yellow-500' : 'bg-cyan-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span>0 GB</span>
          <span>{total} GB</span>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, value, label, change, trend }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend === 'up' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <ParticleBackground />
      
      {/* Mobile Header */}
      {/* <motion.header 
        className="lg:hidden bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">REXIFI DASHBOARD</h1>
          <div className="flex items-center gap-4">
            <div className="relative notifications-dropdown">
              <button onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}>
                <FiBell className="w-6 h-6" />
              </button>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </div>
          </div>
        </div>
      </motion.header> */}
      {/* Mobile Header */}
        <motion.header 
        className="lg:hidden bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        >
        <div className="flex items-center justify-between">
            <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
            <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">REXIFI DASHBOARD</h1>
            <div className="flex items-center gap-4">
            {/* Notifications etc. */}
            </div>
        </div>
        </motion.header>

        <div className="flex">
            {/* Reusable Sidebar Component */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                userData={userData}
                onLogout={handleLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                />

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-8 min-h-screen w-full lg:w-auto">
                {/* Header */}
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
                >
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {userData?.username || 'User'}!</h1>
                    <p className="text-gray-300">Here's your connection overview</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Notifications Dropdown */}
                    <div className="relative notifications-dropdown">
                    <motion.button
                        onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
                        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiBell className="w-6 h-6" />
                        {notifications.filter(n => !n.read).length > 0 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {notificationsDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
                        >
                            <div className="p-4 border-b border-white/20">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-white">Notifications</h3>
                                {notifications.filter(n => !n.read).length > 0 && (
                                <button
                                    onClick={markAllNotificationsAsRead}
                                    className="text-cyan-400 text-sm hover:text-cyan-300"
                                >
                                    Mark all as read
                                </button>
                                )}
                            </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${
                                    !notification.read ? 'bg-cyan-500/10' : ''
                                    }`}
                                >
                                    <p className="text-white text-sm">{notification.message}</p>
                                    <p className="text-gray-400 text-xs mt-1">{notification.type}</p>
                                </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-400">
                                No notifications
                                </div>
                            )}
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>

                    {/* User Dropdown */}
                    <div className="relative user-dropdown">
                    <motion.button
                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-white" />
                        </div>
                        <FiChevronDown className={`w-4 h-4 transition-transform ${
                        userDropdownOpen ? 'rotate-180' : ''
                        }`} />
                    </motion.button>

                    <AnimatePresence>
                        {userDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
                        >
                            <div className="p-4 border-b border-white/20">
                            <p className="font-semibold text-white">{userData?.username || 'User'}</p>
                            <p className="text-gray-300 text-sm truncate">{userData?.email || 'Loading...'}</p>
                            <p className="text-cyan-400 text-xs mt-1">{userData?.plan || 'Standard Plan'}</p>
                            </div>
                            <div className="p-2">
                            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                Profile Settings
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                Billing Information
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                Support
                            </button>
                            </div>
                            <div className="p-2 border-t border-white/20">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                            >
                                <FiLogOut className="w-4 h-4" />
                                Logout
                            </button>
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                </div>
                </motion.div>

                {/* Rest of the dashboard content */}
                {/* Status Alert */}
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center gap-3"
                >
                <FiCheckCircle className="w-5 h-5 text-green-400" />
                <div>
                    <p className="font-semibold text-green-400">Connection Active</p>
                    <p className="text-green-300 text-sm">Your internet is running smoothly</p>
                </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                <StatCard
                    icon={FiDownload}
                    value={`${usageStats.download} Mbps`}
                    label="Download Speed"
                    change="+5.2%"
                    trend="up"
                />
                <StatCard
                    icon={FiUpload}
                    value={`${usageStats.upload} Mbps`}
                    label="Upload Speed"
                    change="+2.1%"
                    trend="up"
                />
                <StatCard
                    icon={FiActivity}
                    value={`${usageStats.latency} ms`}
                    label="Latency"
                    change="-1.5%"
                    trend="down"
                />
                <StatCard
                    icon={FiClock}
                    value={"99.98%"}
                    label="Uptime This Month"
                />
                </motion.div>

                {/* Data Usage */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                >
                <DataUsageMeter 
                    used={324.5} 
                    total={1000} 
                    label="Monthly Data Usage" 
                />
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-white font-semibold mb-4">Billing Overview</h3>
                    <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Current Plan</span>
                        <span className="text-white font-semibold">{userData?.plan || 'Standard Plan'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Monthly Cost</span>
                        <span className="text-cyan-400 font-bold">$89.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Next Billing</span>
                        <span className="text-white">2024-01-15</span>
                    </div>
                    <motion.button
                        className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors mt-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Manage Subscription
                    </motion.button>
                    </div>
                </div>
                </motion.div>

                {/* Recent Activity & Alerts */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <FiActivity className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div>
                            <p className="text-white font-medium capitalize">{activity.type}</p>
                            <p className="text-gray-300 text-sm">{activity.time}</p>
                            </div>
                        </div>
                        <span className="text-cyan-400 font-semibold">{activity.amount}</span>
                        </motion.div>
                    ))}
                    </div>
                </div>

                {/* Service Alerts */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-white font-semibold mb-4">Service Alerts</h3>
                    <div className="space-y-4">
                    {serviceAlerts.map((alert, index) => (
                        <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                            alert.type === 'info' 
                            ? 'bg-blue-500/20 border-blue-500/30' 
                            : 'bg-green-500/20 border-green-500/30'
                        }`}
                        >
                        <div className="flex items-center gap-3">
                            {alert.type === 'info' ? (
                            <FiAlertTriangle className="w-5 h-5 text-blue-400" />
                            ) : (
                            <FiCheckCircle className="w-5 h-5 text-green-400" />
                            )}
                            <div>
                            <p className="text-white">{alert.message}</p>
                            <p className="text-gray-300 text-sm">{alert.time}</p>
                            </div>
                        </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
                </motion.div>
            </main>
        </div>
    </div>
  );
};

export default Dashboard;
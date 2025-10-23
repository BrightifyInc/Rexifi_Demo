import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiTrendingUp,
  FiDownload,
  FiUpload,
  FiActivity,
  FiCalendar,
  FiClock,
  FiWifi,
  FiBarChart2,
  FiPieChart,
  FiFilter,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiDatabase,
  FiHardDrive,
  FiCpu
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

// Mock Chart Component (Replace with actual chart library like Chart.js or Recharts)
const UsageChart = ({ data, type = 'line', color = 'cyan', height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <div className="absolute inset-0 flex items-end justify-between px-4">
        {data.map((point, index) => (
          <motion.div
            key={index}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col items-center ${
              type === 'bar' ? 'w-8' : 'w-2'
            }`}
          >
            {type === 'line' ? (
              <motion.div
                className={`w-2 bg-gradient-to-t from-${color}-500 to-${color}-600 rounded-full`}
                style={{ height: `${(point.value / maxValue) * 100}%` }}
                whileHover={{ scale: 1.2 }}
              />
            ) : (
              <motion.div
                className={`w-8 bg-gradient-to-t from-${color}-500 to-${color}-600 rounded-t-lg`}
                style={{ height: `${(point.value / maxValue) * 100}%` }}
                whileHover={{ scale: 1.1 }}
              />
            )}
            <span className="text-xs text-gray-400 mt-2">{point.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const UsageAnalytics = () => {
  const [activeTab, setActiveTab] = useState('usage');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState({
    download: [],
    upload: [],
    latency: [],
    usageByTime: [],
    devices: [],
    applications: []
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

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

  const generateMockData = (timeRange) => {
    const baseData = {
      '24h': Array.from({ length: 24 }, (_, i) => ({
        label: `${i}:00`,
        value: Math.random() * 100 + 50
      })),
      '7d': Array.from({ length: 7 }, (_, i) => ({
        label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        value: Math.random() * 100 + 50
      })),
      '30d': Array.from({ length: 30 }, (_, i) => ({
        label: `${i + 1}`,
        value: Math.random() * 100 + 50
      }))
    };

    setAnalyticsData({
      download: baseData[timeRange],
      upload: baseData[timeRange].map(d => ({ ...d, value: d.value * 0.3 })),
      latency: baseData[timeRange].map(d => ({ ...d, value: Math.random() * 50 + 10 })),
      usageByTime: Array.from({ length: 24 }, (_, i) => ({
        label: `${i}:00`,
        value: Math.random() * 100
      })),
      devices: [
        { name: 'iPhone 14', usage: 35, type: 'mobile' },
        { name: 'MacBook Pro', usage: 28, type: 'desktop' },
        { name: 'iPad Air', usage: 15, type: 'tablet' },
        { name: 'Windows PC', usage: 12, type: 'desktop' },
        { name: 'Android Phone', usage: 10, type: 'mobile' }
      ],
      applications: [
        { name: 'Netflix', usage: 25, category: 'streaming' },
        { name: 'YouTube', usage: 20, category: 'streaming' },
        { name: 'Zoom', usage: 15, category: 'video' },
        { name: 'Spotify', usage: 12, category: 'music' },
        { name: 'Gaming', usage: 18, category: 'gaming' },
        { name: 'Web Browsing', usage: 10, category: 'browsing' }
      ]
    });
  };

  const checkAuthAndFetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      await fetchUserData();
      generateMockData(timeRange);
      
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

  useEffect(() => {
    generateMockData(timeRange);
  }, [timeRange]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    generateMockData(timeRange);
    setRefreshing(false);
  };

  const StatCard = ({ title, value, change, trend, icon: Icon, color = 'cyan' }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-500/20 rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend === 'up' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-3xl font-bold text-cyan-400">{value}</p>
    </motion.div>
  );

  const AnalyticsCard = ({ title, description, children, className = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );

  const DeviceUsageItem = ({ device, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          device.type === 'mobile' ? 'bg-blue-500/20' :
          device.type === 'desktop' ? 'bg-purple-500/20' :
          'bg-green-500/20'
        }`}>
          <FiHardDrive className={`w-5 h-5 ${
            device.type === 'mobile' ? 'text-blue-400' :
            device.type === 'desktop' ? 'text-purple-400' :
            'text-green-400'
          }`} />
        </div>
        <div>
          <p className="text-white font-medium">{device.name}</p>
          <p className="text-gray-400 text-sm capitalize">{device.type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-cyan-400 font-semibold">{device.usage}%</p>
        <p className="text-gray-400 text-sm">of total usage</p>
      </div>
    </motion.div>
  );

  const ApplicationUsageItem = ({ app, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          app.category === 'streaming' ? 'bg-red-500/20' :
          app.category === 'video' ? 'bg-blue-500/20' :
          app.category === 'music' ? 'bg-green-500/20' :
          app.category === 'gaming' ? 'bg-purple-500/20' :
          'bg-yellow-500/20'
        }`}>
          <FiActivity className={`w-5 h-5 ${
            app.category === 'streaming' ? 'text-red-400' :
            app.category === 'video' ? 'text-blue-400' :
            app.category === 'music' ? 'text-green-400' :
            app.category === 'gaming' ? 'text-purple-400' :
            'text-yellow-400'
          }`} />
        </div>
        <div>
          <p className="text-white font-medium">{app.name}</p>
          <p className="text-gray-400 text-sm capitalize">{app.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-cyan-400 font-semibold">{app.usage}%</p>
        <p className="text-gray-400 text-sm">bandwidth</p>
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
          Loading Analytics...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <ParticleBackground />
      
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
          <h1 className="text-xl font-bold">ANALYTICS</h1>
          <div className="flex items-center gap-4">
            <div className="relative user-dropdown">
              <motion.button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            </div>
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
              <h1 className="text-3xl font-bold">Usage Analytics</h1>
              <p className="text-gray-300">Monitor your internet usage and performance metrics</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                {['24h', '7d', '30d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Refresh Button */}
              <motion.button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiRefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={FiDownload}
              title="Download Speed"
              value="245.6 Mbps"
              change="+5.2%"
              trend="up"
              color="cyan"
            />
            <StatCard
              icon={FiUpload}
              title="Upload Speed"
              value="78.3 Mbps"
              change="+2.1%"
              trend="up"
              color="green"
            />
            <StatCard
              icon={FiActivity}
              title="Latency"
              value="12 ms"
              change="-1.5%"
              trend="down"
              color="purple"
            />
            <StatCard
              icon={FiDatabase}
              title="Data Used"
              value="324.5 GB"
              change="+15%"
              trend="up"
              color="orange"
            />
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Download Usage */}
            <AnalyticsCard
              title="Download Usage"
              description="Your download activity over time"
            >
              <UsageChart data={analyticsData.download} type="bar" color="cyan" height={200} />
              <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                <span>Peak: 356.2 Mbps</span>
                <span>Average: 245.6 Mbps</span>
                <span>Low: 189.4 Mbps</span>
              </div>
            </AnalyticsCard>

            {/* Upload Usage */}
            <AnalyticsCard
              title="Upload Usage"
              description="Your upload activity over time"
            >
              <UsageChart data={analyticsData.upload} type="bar" color="green" height={200} />
              <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                <span>Peak: 95.8 Mbps</span>
                <span>Average: 78.3 Mbps</span>
                <span>Low: 62.1 Mbps</span>
              </div>
            </AnalyticsCard>

            {/* Latency Over Time */}
            <AnalyticsCard
              title="Network Latency"
              description="Response time measurements"
            >
              <UsageChart data={analyticsData.latency} type="line" color="purple" height={200} />
              <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                <span>Best: 8 ms</span>
                <span>Average: 12 ms</span>
                <span>Worst: 58 ms</span>
              </div>
            </AnalyticsCard>

            {/* Usage by Time of Day */}
            {/* Usage by Time of Day - Condensed */}
            <AnalyticsCard
            title="Peak Usage Hours"
            description="When you use the most bandwidth"
            >
            <div className="relative" style={{ height: '200px' }}>
                <div className="absolute inset-0 flex items-end justify-between px-2">
                {analyticsData.usageByTime.filter((_, index) => index % 2 === 0).map((point, index) => (
                    <motion.div
                    key={index}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center w-10"
                    >
                    <motion.div
                        className="w-8 bg-gradient-to-t from-orange-500 to-orange-600 rounded-t-lg"
                        style={{ height: `${point.value}%` }}
                        whileHover={{ scale: 1.1 }}
                    />
                    <span className="text-xs text-gray-400 mt-2 text-center">
                        {point.label}
                    </span>
                    </motion.div>
                ))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-300 text-xs px-2">
                <span>Peak: 19-21h</span>
                <span>Avg: 12-14h</span>
                <span>Low: 04-06h</span>
            </div>
            </AnalyticsCard>
          </div>

          {/* Devices and Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connected Devices */}
            <AnalyticsCard
              title="Connected Devices"
              description="Devices using your network"
              className="h-full"
            >
              <div className="space-y-2">
                {analyticsData.devices.map((device, index) => (
                  <DeviceUsageItem key={device.name} device={device} index={index} />
                ))}
              </div>
              <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <p className="text-cyan-400 text-sm">
                  <strong>5 devices</strong> connected to your network
                </p>
              </div>
            </AnalyticsCard>

            {/* Application Usage */}
            <AnalyticsCard
              title="Application Usage"
              description="Bandwidth usage by application"
              className="h-full"
            >
              <div className="space-y-2">
                {analyticsData.applications.map((app, index) => (
                  <ApplicationUsageItem key={app.name} app={app} index={index} />
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm">
                  <strong>Streaming</strong> accounts for 45% of your bandwidth
                </p>
              </div>
            </AnalyticsCard>
          </div>

          {/* Data Usage Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <AnalyticsCard
              title="Monthly Data Usage"
              description="Your data consumption against plan limits"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>324.5 GB used</span>
                    <span>675.5 GB remaining</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '32.45%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0 GB</span>
                    <span>1000 GB</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <p className="text-cyan-400 font-semibold">32.45%</p>
                    <p className="text-gray-300 text-sm">Used</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <p className="text-green-400 font-semibold">67.55%</p>
                    <p className="text-gray-300 text-sm">Remaining</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <p className="text-orange-400 font-semibold">15 days</p>
                    <p className="text-gray-300 text-sm">Cycle ends</p>
                  </div>
                </div>
              </div>
            </AnalyticsCard>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UsageAnalytics;
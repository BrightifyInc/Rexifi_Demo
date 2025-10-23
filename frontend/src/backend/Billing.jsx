import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiDownload, 
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiClock,
  FiFileText,
  FiShield,
  FiTrendingUp,
  FiZap,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiChevronDown
} from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
    </div>
  );
};

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const navigate = useNavigate();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        const sidebar = document.querySelector('aside');
        const menuButton = document.querySelector('button[class*="lg:hidden"]');
        
        if (sidebar && !sidebar.contains(event.target) && 
            menuButton && !menuButton.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

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

  const fetchBillingData = async () => {
    // Mock billing data - replace with actual API calls
    setInvoices([
      { id: 1, date: '2024-01-15', amount: 89.99, status: 'paid', downloadUrl: '#' },
      { id: 2, date: '2023-12-15', amount: 89.99, status: 'paid', downloadUrl: '#' },
      { id: 3, date: '2023-11-15', amount: 89.99, status: 'paid', downloadUrl: '#' },
      { id: 4, date: '2023-10-15', amount: 89.99, status: 'paid', downloadUrl: '#' }
    ]);

    setPaymentMethods([
      { id: 1, type: 'credit_card', last4: '4242', brand: 'Visa', expiry: '12/25', isDefault: true },
      { id: 2, type: 'paypal', email: 'user@example.com', isDefault: false }
    ]);

    setBillingHistory([
      { id: 1, date: '2024-01-15', description: 'Monthly Subscription', amount: 89.99, status: 'completed' },
      { id: 2, date: '2023-12-20', description: 'Service Upgrade', amount: 29.99, status: 'completed' },
      { id: 3, date: '2023-11-15', description: 'Monthly Subscription', amount: 89.99, status: 'completed' },
      { id: 4, date: '2023-10-15', description: 'Monthly Subscription', amount: 89.99, status: 'refunded' }
    ]);
  };

  const checkAuthAndFetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      await fetchUserData();
      await fetchBillingData();
      
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const BillingCard = ({ icon: Icon, title, amount, description, status, trend }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        {status && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'paid' ? 'bg-green-500/20 text-green-400' : 
            status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
            'bg-red-500/20 text-red-400'
          }`}>
            {status}
          </span>
        )}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-3xl font-bold text-cyan-400 mb-2">{amount}</p>
      <p className="text-gray-300 text-sm">{description}</p>
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${
          trend.value > 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          <FiTrendingUp className={`w-4 h-4 ${trend.value > 0 ? '' : 'rotate-180'}`} />
          <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
          <span className="text-gray-400 ml-1">{trend.period}</span>
        </div>
      )}
    </motion.div>
  );

  const InvoiceCard = ({ invoice }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <FiFileText className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Invoice #{invoice.id}</p>
            <p className="text-gray-400 text-sm">{invoice.date}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {invoice.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-cyan-400">${invoice.amount}</p>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiDownload className="w-4 h-4" />
          Download
        </motion.button>
      </div>
    </motion.div>
  );

  const PaymentMethodCard = ({ method }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <FiCreditCard className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-white font-semibold">
              {method.type === 'credit_card' ? `${method.brand} •••• ${method.last4}` : 'PayPal'}
            </p>
            <p className="text-gray-400 text-sm">
              {method.type === 'credit_card' ? `Expires ${method.expiry}` : method.email}
            </p>
          </div>
        </div>
        {method.isDefault && (
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
            Default
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <motion.button
          className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {method.isDefault ? 'Update' : 'Set Default'}
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Remove
        </motion.button>
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
          Loading Billing Information...
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
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">BILLING</h1>
          <div className="flex items-center gap-4">
            <div className="relative notifications-dropdown">
              <button onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}>
                <FiBell className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar Overlay for Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-40 fixed lg:relative"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Close button for mobile */}
                <div className="flex items-center justify-between mb-8 lg:hidden">
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <FiZap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold">REXIFI</span>
                  </motion.div>
                  <button onClick={() => setSidebarOpen(false)}>
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Logo for desktop */}
                <motion.div
                  className="hidden lg:flex items-center gap-3 mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FiZap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">REXIFI</span>
                </motion.div>

                {/* User Profile */}
                <motion.div
                  className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{userData?.username || 'Loading...'}</p>
                      <p className="text-cyan-400 text-sm">{userData?.plan || 'Standard Plan'}</p>
                      <p className="text-gray-400 text-xs truncate">{userData?.email || 'Loading email...'}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation */}
                <nav className="space-y-2 flex-1">
                  {[
                    { id: 'overview', icon: FiZap, label: 'Overview', path: '/dashboard' },
                    { id: 'billing', icon: FiDollarSign, label: 'Billing', path: '/billing' },
                    { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics', path: '/usage' },
                    { id: 'settings', icon: FiShield, label: 'Settings', path: '/settings' },
                    { id: 'support', icon: FiAlertCircle, label: 'Support', path: '/support' }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        if (item.path) navigate(item.path);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        activeTab === item.id 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Logout Button at Bottom */}
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-400/30 transition-all mt-auto"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen w-full lg:w-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold">Billing & Payments</h1>
              <p className="text-gray-300">Manage your subscription and payment methods</p>
            </div>
            <div className="flex items-center gap-4">
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
              </div>
            </div>
          </motion.div>

          {/* Billing Overview Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <BillingCard
              icon={FiDollarSign}
              title="Current Balance"
              amount="$0.00"
              description="All invoices are paid"
              status="paid"
            />
            <BillingCard
              icon={FiCalendar}
              title="Next Billing"
              amount="$89.99"
              description="Due Jan 15, 2024"
              status="pending"
            />
            <BillingCard
              icon={FiTrendingUp}
              title="Total Spent"
              amount="$359.96"
              description="Last 4 months"
              trend={{ value: 12, period: 'this year' }}
            />
            <BillingCard
              icon={FiCheckCircle}
              title="Plan Status"
              amount="Active"
              description="Business Pro Plan"
              status="active"
            />
          </motion.div>

          {/* Payment Methods Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiCreditCard className="w-4 h-4" />
                Add Payment Method
              </motion.button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <PaymentMethodCard key={method.id} method={method} />
              ))}
            </div>
          </motion.section>

          {/* Invoices Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Invoices</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {invoices.map((invoice, index) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </motion.section>

          {/* Billing History Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Billing History</h2>
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-4 text-gray-300 font-semibold">Date</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Description</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Amount</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="p-4 text-white">{item.date}</td>
                        <td className="p-4 text-gray-300">{item.description}</td>
                        <td className="p-4 text-cyan-400 font-semibold">${item.amount}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <motion.button
                            className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiDownload className="w-3 h-3" />
                            Receipt
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help with Billing?</h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Our support team is here to help you with any billing questions or issues you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiAlertCircle className="w-5 h-5" />
                  Contact Support
                </motion.button>
                <motion.button
                  className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiFileText className="w-5 h-5" />
                  Download All Invoices
                </motion.button>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default BillingPage;
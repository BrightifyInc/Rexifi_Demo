import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiMessageCircle,
  FiHelpCircle,
  FiBook,
  FiPhone,
  FiMail,
  FiClock,
  FiSearch,
  FiPlus,
  FiSend,
  FiVideo,
  FiHeadphones,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiExternalLink
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

const Support = () => {
  const [activeTab, setActiveTab] = useState('support');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSupportTab, setActiveSupportTab] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

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

  const checkAuthAndFetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      await fetchUserData();
      await fetchSupportData();
      
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

  const fetchSupportData = async () => {
    // Mock support data
    setTickets([
      { id: 1, subject: 'Slow internet speed', status: 'open', priority: 'high', createdAt: '2024-01-15', lastUpdate: '2 hours ago' },
      { id: 2, subject: 'Billing inquiry', status: 'resolved', priority: 'medium', createdAt: '2024-01-10', lastUpdate: '3 days ago' },
      { id: 3, subject: 'Router configuration', status: 'in-progress', priority: 'medium', createdAt: '2024-01-12', lastUpdate: '1 day ago' },
      { id: 4, subject: 'Service outage', status: 'resolved', priority: 'high', createdAt: '2024-01-08', lastUpdate: '5 days ago' }
    ]);

    setFaqs([
      { id: 1, question: 'How do I reset my router?', answer: 'To reset your router, locate the reset button on the back...', category: 'Troubleshooting' },
      { id: 2, question: 'What internet speeds should I expect?', answer: 'Your actual speeds may vary based on your plan...', category: 'Performance' },
      { id: 3, question: 'How can I upgrade my plan?', answer: 'You can upgrade your plan through your account dashboard...', category: 'Billing' },
      { id: 4, question: 'Is there a data cap on my plan?', answer: 'Most of our plans come with unlimited data...', category: 'Billing' },
      { id: 5, question: 'How do I set up parental controls?', answer: 'Parental controls can be configured through your router settings...', category: 'Features' },
      { id: 6, question: 'What should I do during an outage?', answer: 'First, check our service status page for any ongoing issues...', category: 'Troubleshooting' }
    ]);
  };

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Support ticket submitted successfully!');
    setMessage('');
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SupportCard = ({ icon: Icon, title, description, buttonText, onButtonClick, color = 'cyan' }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 bg-${color}-500/20 rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          <motion.button
            onClick={onButtonClick}
            className={`bg-${color}-500 text-white px-4 py-2 rounded-lg hover:bg-${color}-600 transition-colors flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
            <FiArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      open: { color: 'green', text: 'Open' },
      'in-progress': { color: 'yellow', text: 'In Progress' },
      resolved: { color: 'blue', text: 'Resolved' },
      high: { color: 'red', text: 'High' },
      medium: { color: 'yellow', text: 'Medium' },
      low: { color: 'green', text: 'Low' }
    };

    const config = statusConfig[status] || { color: 'gray', text: status };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${config.color}-500/20 text-${config.color}-400`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Loading Support Center...
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
          <h1 className="text-xl font-bold">SUPPORT</h1>
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
              <h1 className="text-3xl font-bold">Support Center</h1>
              <p className="text-gray-300">Get help with your Rexifi services and account</p>
            </div>
          </motion.div>

          {/* Quick Support Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <SupportCard
              icon={FiMessageCircle}
              title="Live Chat"
              description="Chat with our support team in real-time"
              buttonText="Start Chat"
              onButtonClick={() => setActiveSupportTab('contact')}
              color="cyan"
            />
            <SupportCard
              icon={FiPhone}
              title="Phone Support"
              description="Call us directly for immediate assistance"
              buttonText="Call Now"
              onButtonClick={() => window.open('tel:1-800-REXIFI')}
              color="green"
            />
            <SupportCard
              icon={FiVideo}
              title="Video Guide"
              description="Watch step-by-step tutorials"
              buttonText="Watch"
              onButtonClick={() => setActiveSupportTab('knowledge')}
              color="purple"
            />
            <SupportCard
              icon={FiHeadphones}
              title="Community"
              description="Get help from other Rexifi users"
              buttonText="Join"
              onButtonClick={() => window.open('https://community.rexifi.com')}
              color="orange"
            />
          </motion.div>

          {/* Support Tabs */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 mb-8">
            {/* Tab Headers */}
            <div className="flex border-b border-white/20">
              {[
                { id: 'contact', label: 'Contact Support', icon: FiMessageCircle },
                { id: 'tickets', label: 'My Tickets', icon: FiHelpCircle },
                { id: 'knowledge', label: 'Knowledge Base', icon: FiBook }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSupportTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
                    activeSupportTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Contact Support Tab */}
              <AnimatePresence mode="wait">
                {activeSupportTab === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Submit a Support Ticket</h3>
                      <form onSubmit={handleSubmitTicket} className="space-y-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Subject</label>
                          <input
                            type="text"
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="Brief description of your issue"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Priority</label>
                          <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Description</label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="6"
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="Please describe your issue in detail..."
                          />
                        </div>
                        <motion.button
                          type="submit"
                          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiSend className="w-4 h-4" />
                          Submit Ticket
                        </motion.button>
                      </form>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Support Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                          <FiPhone className="w-6 h-6 text-green-400" />
                          <div>
                            <p className="font-semibold">Phone Support</p>
                            <p className="text-cyan-400">1-800-REXIFI (739-434)</p>
                            <p className="text-gray-300 text-sm">24/7 Available</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                          <FiMail className="w-6 h-6 text-blue-400" />
                          <div>
                            <p className="font-semibold">Email Support</p>
                            <p className="text-cyan-400">support@rexifi.com</p>
                            <p className="text-gray-300 text-sm">Response within 2 hours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                          <FiClock className="w-6 h-6 text-yellow-400" />
                          <div>
                            <p className="font-semibold">Live Chat</p>
                            <p className="text-cyan-400">Available Now</p>
                            <p className="text-gray-300 text-sm">Mon-Sun: 6AM-11PM EST</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* My Tickets Tab */}
              <AnimatePresence mode="wait">
                {activeSupportTab === 'tickets' && (
                  <motion.div
                    key="tickets"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">My Support Tickets</h3>
                      <motion.button
                        className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiPlus className="w-4 h-4" />
                        New Ticket
                      </motion.button>
                    </div>
                    <div className="space-y-4">
                      {tickets.map((ticket, index) => (
                        <motion.div
                          key={ticket.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-cyan-400/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-semibold text-white">{ticket.subject}</p>
                                <p className="text-gray-300 text-sm">Created: {ticket.createdAt}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <StatusBadge status={ticket.status} />
                              <StatusBadge status={ticket.priority} />
                              <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                <FiExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-300">
                            Last update: {ticket.lastUpdate}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Knowledge Base Tab */}
              <AnimatePresence mode="wait">
                {activeSupportTab === 'knowledge' && (
                  <motion.div
                    key="knowledge"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Knowledge Base</h3>
                      <div className="relative w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search articles..."
                          className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredFaqs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-cyan-400/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-white">{faq.question}</h4>
                            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-semibold">
                              {faq.category}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{faq.answer}</p>
                          <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1">
                            Read more
                            <FiArrowRight className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Emergency Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-xl p-6 border border-orange-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiAlertCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">Service Outage Alert</h3>
                <p className="text-gray-200">
                  We're currently experiencing intermittent service issues in the downtown area. Our team is working to resolve this ASAP.
                  <span className="text-orange-300 font-semibold"> Expected resolution: 2-3 hours.</span>
                </p>
              </div>
              <motion.button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Status
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Support;
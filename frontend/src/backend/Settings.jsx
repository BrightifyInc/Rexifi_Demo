import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiShield,
  FiWifi,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiRotateCcw,
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiInfo
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

const Settings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  // Settings states
  const [profileSettings, setProfileSettings] = useState({
    username: '',
    email: '',
    phone: '',
    language: 'en',
    timezone: 'UTC'
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    marketingEmails: false,
    usageStatistics: true,
    showOnlineStatus: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    billingAlerts: true,
    serviceUpdates: true,
    securityAlerts: true
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        // Initialize form with user data
        setProfileSettings(prev => ({
          ...prev,
          username: response.data.user.username || '',
          email: response.data.user.email || ''
        }));
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveSettings = async (section) => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetSection = (section) => {
    switch (section) {
      case 'profile':
        setProfileSettings({
          username: userData?.username || '',
          email: userData?.email || '',
          phone: '',
          language: 'en',
          timezone: 'UTC'
        });
        break;
      case 'security':
        setSecuritySettings({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          twoFactorEnabled: false,
          loginAlerts: true
        });
        break;
      case 'privacy':
        setPrivacySettings({
          dataCollection: true,
          marketingEmails: false,
          usageStatistics: true,
          showOnlineStatus: true
        });
        break;
      case 'notifications':
        setNotificationSettings({
          emailNotifications: true,
          pushNotifications: true,
          billingAlerts: true,
          serviceUpdates: true,
          securityAlerts: true
        });
        break;
    }
  };

  const SettingSection = ({ title, icon: Icon, children, section, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-300 text-sm">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={() => handleResetSection(section)}
            className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
          <motion.button
            onClick={() => handleSaveSettings(section)}
            disabled={saving}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSave className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : 'Save'}
          </motion.button>
        </div>
      </div>
      {children}
    </motion.div>
  );

  const ToggleSwitch = ({ enabled, setEnabled, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-white font-medium">{label}</p>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-cyan-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const InputField = ({ label, type, value, onChange, placeholder, icon: Icon, showPassword, setShowPassword }) => (
    <div className="mb-4">
      <label className="block text-white font-medium mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors ${
            Icon ? 'pl-11' : 'pl-4'
          } ${type === 'password' ? 'pr-11' : ''}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Loading Settings...
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
          <h1 className="text-xl font-bold">SETTINGS</h1>
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
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-gray-300">Manage your account preferences and security settings</p>
            </div>
            
            {/* Save Success Notification */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg"
                >
                  <FiCheck className="w-4 h-4" />
                  Settings saved successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Profile Settings */}
          <SettingSection
            title="Profile Information"
            icon={FiUser}
            section="profile"
            description="Update your personal information and account details"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Username"
                type="text"
                value={profileSettings.username}
                onChange={(e) => setProfileSettings({...profileSettings, username: e.target.value})}
                placeholder="Enter your username"
                icon={FiUser}
              />
              <InputField
                label="Email Address"
                type="email"
                value={profileSettings.email}
                onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                placeholder="Enter your email"
                icon={FiUser}
              />
              <InputField
                label="Phone Number"
                type="tel"
                value={profileSettings.phone}
                onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
                placeholder="+1 (555) 000-0000"
                icon={FiUser}
              />
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Language</label>
                <select
                  value={profileSettings.language}
                  onChange={(e) => setProfileSettings({...profileSettings, language: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </SettingSection>

          {/* Security Settings */}
          <SettingSection
            title="Security & Authentication"
            icon={FiShield}
            section="security"
            description="Manage your password and security preferences"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Current Password"
                type="password"
                value={securitySettings.currentPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                placeholder="Enter current password"
                icon={FiLock}
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
              />
              <InputField
                label="New Password"
                type="password"
                value={securitySettings.newPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                placeholder="Enter new password"
                icon={FiLock}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
              />
              <InputField
                label="Confirm New Password"
                type="password"
                value={securitySettings.confirmPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
                icon={FiLock}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <ToggleSwitch
                enabled={securitySettings.twoFactorEnabled}
                setEnabled={(enabled) => setSecuritySettings({...securitySettings, twoFactorEnabled: enabled})}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />
              <ToggleSwitch
                enabled={securitySettings.loginAlerts}
                setEnabled={(enabled) => setSecuritySettings({...securitySettings, loginAlerts: enabled})}
                label="Login Alerts"
                description="Get notified when someone logs into your account"
              />
            </div>
          </SettingSection>

          {/* Privacy Settings */}
          <SettingSection
            title="Privacy & Data"
            icon={FiLock}
            section="privacy"
            description="Control how your data is collected and used"
          >
            <div className="space-y-4">
              <ToggleSwitch
                enabled={privacySettings.dataCollection}
                setEnabled={(enabled) => setPrivacySettings({...privacySettings, dataCollection: enabled})}
                label="Data Collection"
                description="Allow us to collect usage data to improve our services"
              />
              <ToggleSwitch
                enabled={privacySettings.marketingEmails}
                setEnabled={(enabled) => setPrivacySettings({...privacySettings, marketingEmails: enabled})}
                label="Marketing Emails"
                description="Receive emails about new features and promotions"
              />
              <ToggleSwitch
                enabled={privacySettings.usageStatistics}
                setEnabled={(enabled) => setPrivacySettings({...privacySettings, usageStatistics: enabled})}
                label="Usage Statistics"
                description="Share anonymous usage data to help improve Rexifi"
              />
              <ToggleSwitch
                enabled={privacySettings.showOnlineStatus}
                setEnabled={(enabled) => setPrivacySettings({...privacySettings, showOnlineStatus: enabled})}
                label="Show Online Status"
                description="Let other users see when you're online"
              />
            </div>
          </SettingSection>

          {/* Notification Settings */}
          <SettingSection
            title="Notifications"
            icon={FiBell}
            section="notifications"
            description="Choose what notifications you want to receive"
          >
            <div className="space-y-4">
              <ToggleSwitch
                enabled={notificationSettings.emailNotifications}
                setEnabled={(enabled) => setNotificationSettings({...notificationSettings, emailNotifications: enabled})}
                label="Email Notifications"
                description="Receive important updates via email"
              />
              <ToggleSwitch
                enabled={notificationSettings.pushNotifications}
                setEnabled={(enabled) => setNotificationSettings({...notificationSettings, pushNotifications: enabled})}
                label="Push Notifications"
                description="Get real-time notifications in your browser"
              />
              <ToggleSwitch
                enabled={notificationSettings.billingAlerts}
                setEnabled={(enabled) => setNotificationSettings({...notificationSettings, billingAlerts: enabled})}
                label="Billing Alerts"
                description="Notifications about payments and invoices"
              />
              <ToggleSwitch
                enabled={notificationSettings.serviceUpdates}
                setEnabled={(enabled) => setNotificationSettings({...notificationSettings, serviceUpdates: enabled})}
                label="Service Updates"
                description="Important updates about Rexifi services"
              />
              <ToggleSwitch
                enabled={notificationSettings.securityAlerts}
                setEnabled={(enabled) => setNotificationSettings({...notificationSettings, securityAlerts: enabled})}
                label="Security Alerts"
                description="Critical security notifications"
              />
            </div>
          </SettingSection>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Danger Zone</h3>
                <p className="text-gray-300 text-sm">Irreversible and destructive actions</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                className="w-full px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold">Delete Account</div>
                <div className="text-sm text-red-300">Permanently delete your account and all data</div>
              </motion.button>
              
              <motion.button
                className="w-full px-4 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition-colors text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold">Export Data</div>
                <div className="text-sm text-orange-300">Download all your personal data</div>
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
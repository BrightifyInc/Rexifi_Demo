// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   FiWifi,
//   FiActivity,
//   FiDollarSign,
//   FiSettings,
//   FiHelpCircle,
//   FiUser,
//   FiLogOut,
//   FiX,
//   FiTrendingUp
// } from 'react-icons/fi';

// const Sidebar = ({ 
//   sidebarOpen, 
//   setSidebarOpen, 
//   userData, 
//   onLogout,
//   activeTab,
//   setActiveTab 
// }) => {
//   const location = useLocation();

//   // Determine active tab based on current route
//   const getActiveTabFromRoute = () => {
//     const path = location.pathname;
//     if (path === '/dashboard') return 'overview';
//     if (path === '/usage') return 'usage';
//     if (path === '/billing') return 'billing';
//     if (path === '/settings') return 'settings';
//     if (path === '/support') return 'support';
//     return 'overview';
//   };

//   const navigationItems = [
//     { id: 'overview', icon: FiActivity, label: 'Overview', path: '/dashboard' },
//     { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics', path: '/usage' },
//     { id: 'billing', icon: FiDollarSign, label: 'Billing', path: '/billing' },
//     { id: 'settings', icon: FiSettings, label: 'Settings', path: '/settings' },
//     { id: 'support', icon: FiHelpCircle, label: 'Support', path: '/support' }
//   ];

//   const currentActiveTab = activeTab || getActiveTabFromRoute();

//   const handleNavClick = (itemId) => {
//     setActiveTab(itemId);
//     if (window.innerWidth < 1024) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Sidebar Overlay for Mobile */}
//       {sidebarOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         initial={{ x: -300 }}
//         animate={{ x: 0 }}
//         exit={{ x: -300 }}
//         className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-40 fixed lg:relative"
//       >
//         <div className="p-6 flex flex-col h-full">
//           {/* Close button for mobile */}
//           <div className="flex items-center justify-between mb-8 lg:hidden">
//             <motion.div
//               className="flex items-center gap-3"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <FiWifi className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl font-bold">REXIFI</span>
//             </motion.div>
//             <button onClick={() => setSidebarOpen(false)}>
//               <FiX className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Logo for desktop */}
//           <motion.div
//             className="hidden lg:flex items-center gap-3 mb-8"
//             whileHover={{ scale: 1.05 }}
//           >
//             <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//               <FiWifi className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold">REXIFI</span>
//           </motion.div>

//           {/* User Profile */}
//           <motion.div
//             className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
//             whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                 <FiUser className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <p className="font-semibold">{userData?.username || 'Loading...'}</p>
//                 <p className="text-cyan-400 text-sm">{userData?.plan || 'Standard Plan'}</p>
//                 <p className="text-gray-400 text-xs truncate">{userData?.email || 'Loading email...'}</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Navigation */}
//           <nav className="space-y-2 flex-1">
//             {navigationItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 whileHover={{ x: 5 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to={item.path}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
//                     currentActiveTab === item.id 
//                       ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
//                       : 'text-gray-300 hover:bg-white/5'
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </Link>
//               </motion.div>
//             ))}
//           </nav>

//           {/* Logout Button at Bottom */}
//           <motion.button
//             onClick={onLogout}
//             className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-400/30 transition-all mt-auto"
//             whileHover={{ x: 5 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FiLogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </motion.button>
//         </div>
//       </motion.aside>
//     </>
//   );
// };

// export default Sidebar;








import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FiWifi,
  FiActivity,
  FiDollarSign,
  FiSettings,
  FiHelpCircle,
  FiUser,
  FiLogOut,
  FiX,
  FiTrendingUp
} from 'react-icons/fi';

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  userData, 
  onLogout,
  activeTab,
  setActiveTab 
}) => {
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTabFromRoute = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'overview';
    if (path === '/usage') return 'usage';
    if (path === '/billing') return 'billing';
    if (path === '/settings') return 'settings';
    if (path === '/user-support') return 'support';
    return 'overview';
  };

  const navigationItems = [
    { id: 'overview', icon: FiActivity, label: 'Overview', path: '/dashboard' },
    { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics', path: '/usage' },
    { id: 'billing', icon: FiDollarSign, label: 'Billing', path: '/billing' },
    { id: 'settings', icon: FiSettings, label: 'Settings', path: '/settings' },
    { id: 'support', icon: FiHelpCircle, label: 'Support', path: '/user-support' }
  ];

  const currentActiveTab = activeTab || getActiveTabFromRoute();

  const handleNavClick = (itemId) => {
    if (setActiveTab) {
      setActiveTab(itemId);
    }
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
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
                    <FiWifi className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">REXIFI</span>
                </motion.div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Logo for desktop */}
              <motion.div
                className="hidden lg:flex items-center gap-3 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FiWifi className="w-6 h-6 text-white" />
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
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        currentActiveTab === item.id 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Logout Button at Bottom */}
              <motion.button
                onClick={onLogout}
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
    </>
  );
};

export default Sidebar;
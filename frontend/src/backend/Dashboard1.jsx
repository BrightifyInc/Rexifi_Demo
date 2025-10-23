// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {

//   const navigate = useNavigate()
//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token')
//       const response = await axios.get('http://localhost:3000/auth/', {
//         headers: {
//           "Authorization" : `Bearer ${token}`
//         }
//       })
//       if (response.status !== 201) {
//         navigate('/login')
//       }
//     } catch (error) {
//       navigate('/login')
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchUser()
//   }, [])



//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [editProfileModal, setEditProfileModal] = useState(false);
//   const [changePasswordModal, setChangePasswordModal] = useState(false);
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     // Apply dark mode on page load if saved in localStorage
//     const savedDarkMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedDarkMode);
    
//     if (savedDarkMode) {
//       document.documentElement.classList.add('dark');
//       document.documentElement.classList.remove('light');
//     } else {
//       document.documentElement.classList.add('light');
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     localStorage.setItem('darkMode', newDarkMode);
    
//     if (newDarkMode) {
//       document.documentElement.classList.add('dark');
//       document.documentElement.classList.remove('light');
//     } else {
//       document.documentElement.classList.add('light');
//       document.documentElement.classList.remove('dark');
//     }
//   };

//   const toggleDropdown = (name) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   const closeDropdowns = () => {
//     setActiveDropdown(null);
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.nav-item') && !e.target.closest('.dropdown-menu') && !e.target.closest('.mobile-dropdown-toggle')) {
//         closeDropdowns();
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   // Reset activeDropdown when resizing to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setActiveDropdown(null);
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className={`${darkMode ? 'dark' : ''}`}>
//       <div className="dark:bg-dark-secondary bg-gray-50 min-h-screen">
//         {/* Top Navigation Bar */}
//         <header className="bg-white dark:bg-dark-primary border-b dark:border-gray-800 border-gray-100 sticky top-0 z-50 py-2 lg:py-0">
//           <div className="px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between">
//               {/* Logo and Mobile Menu Button */}
//               <div className="flex">
//                 <div className="flex-shrink-0 flex items-center">
//                   {/* Mobile menu button */}
//                   <button
//                     onClick={() => setSidebarOpen(!sidebarOpen)}
//                     type="button"
//                     className="inline-flex items-center justify-center mr-3 rounded-md text-gray-400 lg:hidden"
//                   >
//                     {!sidebarOpen ? (
//                       <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                       </svg>
//                     ) : (
//                       <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     )}
//                   </button>
//                   {/* Logo */}
//                   <div className="flex items-center">
//                     <a href="dashboard.html">
//                       <img src="./assets/images/logo-black.svg" className="block dark:hidden" alt="" />
//                       <img src="./assets/images/logo-white.svg" className="hidden dark:block" alt="" />
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden lg:flex lg:items-center">
//                 <a
//                   href="index.html"
//                   className="text-gray-500 dark:text-gray-400 text-sm px-4 py-6 hover:text-primary-500 font-medium"
//                 >
//                   Home
//                 </a>

//                 {/* Products Dropdown (Desktop) */}
//                 <div className="relative nav-item">
//                   <button
//                     onClick={() => toggleDropdown('products')}
//                     className="text-gray-500 dark:text-gray-400 hover:text-primary-500 group text-sm inline-flex items-center px-4 py-6 font-medium rounded-full"
//                   >
//                     Products
//                     <svg
//                       className="ml-1 h-4 w-4 transition-transform duration-200"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="17"
//                       height="16"
//                       viewBox="0 0 17 16"
//                       fill="none"
//                     >
//                       <path
//                         d="M4.33301 5.91666L8.49967 10.0833L12.6663 5.91666"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>

//                   {/* Products dropdown menu */}
//                   {activeDropdown === 'products' && (
//                     <div className="dropdown-menu absolute dark:bg-dark-secondary dark:border-gray-800 left-0 w-[266px] bg-white rounded-2xl shadow-theme-lg border border-gray-100 p-3 z-50">
//                       <div className="space-y-1">
//                         <a
//                           href="text-generator.html"
//                           className="flex items-center px-2 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
//                         >
//                           {/* SVG icon */}
//                           <span>Text Generator</span>
//                         </a>
//                         {/* Other product links */}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Pages Dropdown (Desktop) */}
//                 <div className="relative nav-item">
//                   <button
//                     onClick={() => toggleDropdown('pages')}
//                     className="text-gray-500 group dark:text-gray-400 hover:text-primary-400 text-sm inline-flex items-center px-4 py-6 font-medium rounded-full"
//                   >
//                     Pages
//                     <svg
//                       className="ml-1 h-4 w-4 transition-transform duration-200"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="17"
//                       height="16"
//                       viewBox="0 0 17 16"
//                       fill="none"
//                     >
//                       <path
//                         d="M4.33301 5.91666L8.49967 10.0833L12.6663 5.91666"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>

//                   {/* Pages dropdown menu */}
//                   {activeDropdown === 'pages' && (
//                     <div className="dropdown-menu absolute left-0 w-[266px] bg-white dark:bg-dark-secondary dark:border-gray-800 rounded-2xl shadow-theme-lg border border-gray-100 p-3 z-50">
//                       <div className="space-y-1">
//                         <a
//                           href="dashboard.html"
//                           className="flex items-center px-4 py-3 hover:text-gray-800 dark:hover:text-white/90 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
//                         >
//                           Dashboard
//                         </a>
//                         {/* Other page links */}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <a
//                   href="contact.html"
//                   className="text-gray-500 dark:text-gray-400 text-sm px-4 py-6 hover:text-primary-500 font-medium"
//                 >
//                   Contact
//                 </a>
//               </nav>

//               {/* Right side buttons */}
//               <div className="flex items-center">
//                 {/* Dark Mode Toggle */}
//                 <button
//                   onClick={toggleDarkMode}
//                   className="inline-flex items-center dark:hover:bg-white/5 dark:hover:text-white/90 hover:bg-gray-100 hover:text-gray-800 text-gray-500 dark:text-gray-400 justify-center border border-gray-200 dark:border-gray-700 rounded-full size-11"
//                 >
//                   {!darkMode ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                       <path
//                         d="M6.24683 7.08492C6.24683 10.7677 9.23232 13.7532 12.9151 13.7532C14.6687 13.7532 16.2641 13.0764 17.4545 11.9697C16.584 15.2727 13.5765 17.7083 10.0001 17.7083C5.74289 17.7083 2.29175 14.2572 2.29175 9.99996C2.29175 6.42356 4.72736 3.41602 8.03036 2.54558C6.92367 3.73594 6.24683 5.33139 6.24683 7.08492Z"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   ) : (
//                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                       />
//                     </svg>
//                   )}
//                 </button>

//                 {/* Account dropdown */}
//                 <div className="ml-4 relative flex-shrink-0">
//                   <div>
//                     <button
//                       onClick={() => toggleDropdown('account')}
//                       className="rounded-full text-sm font-medium focus:outline-none"
//                     >
//                       <img
//                         src="./assets/images/users/user-1.png"
//                         className="w-11 h-11 rounded-full"
//                         alt="User profile"
//                       />
//                     </button>
//                   </div>
//                   {activeDropdown === 'account' && (
//                     <div className="origin-top-right absolute right-0 mt-2 w-[260px] shadow-lg dark:bg-dark-secondary dark:border-gray-800 py-4 px-3 bg-white border border-gray-200 rounded-2xl">
//                       <div className="mb-4 px-3">
//                         <span className="text-gray-700 text-sm font-medium dark:text-gray-400">musharof</span>
//                         <p className="text-gray-500 text-sm dark:text-gray-400">musharof@example.com</p>
//                       </div>
//                       <div className="space-y-1">
//                         <a
//                           href="#"
//                           className="px-3 py-2 flex gap-3 dark:hover:bg-white/[0.05] dark:text-gray-400 font-medium items-center text-sm text-gray-700 hover:text-gray-800 transition hover:bg-gray-100 rounded-lg dark:hover:text-white/90"
//                         >
//                           Edit profile
//                         </a>
//                         {/* Other account links */}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile right sidebar button */}
//                 <button
//                   onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
//                   type="button"
//                   className="inline-flex ml-4 lg:hidden items-center dark:hover:bg-white/5 dark:hover:text-white/90 hover:bg-gray-100 hover:text-gray-800 text-gray-500 dark:text-gray-400 justify-center border border-gray-200 dark:border-gray-700 rounded-full size-11"
//                 >
//                   <span className="sr-only">Open right sidebar</span>
//                   {/* Menu icon */}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>
//         {/* Top Navigation Bar End */}

//         <div className="flex">
//           {/* Sidebar */}
//           <aside
//             className={`fixed inset-y-0 left-0 z-20 w-[288px] bg-white dark:bg-dark-primary border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 h-screen ${
//               sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//             }`}
//           >
//             <div className="h-full flex flex-col">
//               <div className="flex-1 overflow-y-auto">
//                 <span className="px-10 mb-4 pt-10 block text-xs font-normal text-gray-500 dark:text-gray-400">
//                   Main Menu
//                 </span>
//                 <nav className="space-y-1">
//                   <a
//                     href="dashboard.html"
//                     className="group dark:bg-primary-500/10 flex gap-2.5 border-l-3 border-primary-500 hover:bg-primary-50 items-center px-10 py-3 text-sm font-medium text-primary-500 dark:hover:bg-primary-500/10"
//                   >
//                     Profile and security
//                   </a>
//                   {/* Other sidebar links */}
//                 </nav>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <div className="flex-1">
//             <main className="py-6 px-4 sm:px-6 lg:px-8">
//               {/* Welcome Banner */}
//               <div className="mb-8 bg-primary rounded-2xl relative overflow-hidden dashboard-gradient">
//                 <div className="px-6 py-8 md:px-10 md:py-10 md:max-w-3xl relative z-10">
//                   <div>
//                     <h2 className="text-2xl font-bold text-white mb-2">Welcome to AI Agent</h2>
//                     <p className="text-white/80 text-sm mb-6">
//                       Create Content Smarter, Faster, and Effortlessly with AI Agent.
//                     </p>
//                     <button className="inline-flex items-center text-white bg-transparent hover:bg-white hover:text-primary-500 transition border border-white/50 py-3 px-5 shadow-theme-xs text-sm font-medium rounded-full">
//                       Learn more
//                     </button>
//                   </div>
//                 </div>
//                 <img
//                   src="./assets/images/dashboard/Saly.png"
//                   alt="AI Agent illustration"
//                   className="absolute right-5 top-0 h-full object-contain hidden md:block"
//                   style={{ maxWidth: '300px' }}
//                 />
//                 <button className="rounded-full p-2 bg-white/30 hover:bg-white/70 hover:text-gray-800 transition text-gray-500 absolute right-3 top-3">
//                   {/* Close icon */}
//                 </button>
//               </div>

//               {/* Profile Section */}
//               <div className="mb-8 p-6 rounded-2xl border bg-white border-gray-100 dark:border-gray-800 dark:bg-dark-primary">
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-6">My Profile</h2>
//                 <div className="bg-white border dark:bg-dark-primary dark:border-gray-800 border-gray-200 rounded-xl overflow-hidden">
//                   <div className="p-6 flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Personal Information</h3>
//                     <button
//                       onClick={() => setEditProfileModal(true)}
//                       className="inline-flex items-center shadow-theme-xs dark:hover:bg-white/5 dark:hover:text-white/90 transition dark:bg-dark-primary dark:text-gray-400 px-4 py-3 gap-2 dark:border-gray-800 border border-gray-200 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                   <div className="max-w-lg p-6 pt-0">
//                     <div className="grid grid-cols-2 gap-7">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">First Name</label>
//                         <span className="mt-1 block text-base text-gray-800 dark:text-white/90">Andrio</span>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</label>
//                         <span className="mt-1 block text-base text-gray-800 dark:text-white/90">Metheio</span>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email address</label>
//                         <span className="mt-1 block text-base text-gray-800 dark:text-white/90">random@pimjo.com</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Security Section */}
//               <div className="p-6 rounded-2xl border bg-white border-gray-100 dark:border-gray-800 dark:bg-dark-primary">
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-6">Security</h2>
//                 {twoFactorEnabled ? (
//                   <div className="bg-white border dark:bg-dark-primary dark:border-gray-800 border-gray-200 rounded-2xl overflow-hidden mb-6 p-6">
//                     <div className="flex gap-5 flex-col md:flex-row justify-between md:items-center">
//                       <div className="flex-1">
//                         <h3 className="text-lg flex items-center gap-2.5 font-semibold text-gray-800 dark:text-white/90">
//                           Two factor authentication
//                           <span className="inline-flex dark:bg-success-600/15 dark:text-success-600 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             Enabled
//                           </span>
//                         </h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
//                           Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.
//                         </p>
//                       </div>
//                       <div>
//                         <button
//                           onClick={() => setTwoFactorEnabled(false)}
//                           className="inline-flex items-center shadow-theme-xs dark:hover:bg-white/5 dark:hover:text-white/90 transition dark:bg-dark-primary dark:text-gray-400 px-4 py-3 gap-2 dark:border-gray-800 border border-gray-200 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
//                         >
//                           Disable Two-factor authentication
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="bg-white border dark:bg-dark-primary dark:border-gray-800 border-gray-200 rounded-2xl p-6 mb-6">
//                     <div className="flex gap-5 flex-col md:flex-row justify-between md:items-center">
//                       <div className="flex-1">
//                         <h3 className="text-lg flex items-center gap-2.5 dark:text-white/90 font-semibold text-gray-800">
//                           Two factor authentication
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium dark:text-white/80 dark:bg-white/[0.05] bg-gray-100 text-gray-800">
//                             Disabled
//                           </span>
//                         </h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
//                           Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.
//                         </p>
//                       </div>
//                       <div>
//                         <button
//                           onClick={() => setTwoFactorEnabled(true)}
//                           className="inline-flex items-center shadow-theme-xs dark:hover:bg-white/5 dark:hover:text-white/90 transition dark:bg-dark-primary dark:text-gray-400 px-4 py-3 gap-2 dark:border-gray-800 border border-gray-200 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
//                         >
//                           Enable Two-factor authentication
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div className="bg-white dark:bg-dark-primary dark:border-gray-800 border p-6 border-gray-200 rounded-2xl overflow-hidden">
//                   <div className="flex flex-col gap-5 sm:flex-row justify-between sm:items-center">
//                     <h3 className="text-lg font-semibold dark:text-white/90 text-gray-800">Change your Password</h3>
//                     <div>
//                       <button
//                         onClick={() => setChangePasswordModal(true)}
//                         className="inline-flex items-center dark:hover:bg-white/5 dark:hover:text-white/90 transition dark:bg-dark-primary dark:text-gray-400 px-4 py-3 gap-2 dark:border-gray-800 border border-gray-200 shadow-theme-xs text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
//                       >
//                         Change Password
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </div>

//           {/* Right Sidebar */}
//           <aside
//             className={`fixed inset-y-0 top-0 right-0 z-40 w-[288px] bg-white dark:bg-dark-primary border-l border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden lg:static lg:h-auto ${
//               rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
//             }`}
//           >
//             {/* Mobile navigation content */}
//           </aside>
//         </div>

//         {/* Backdrop for mobile sidebar */}
//         {(sidebarOpen || rightSidebarOpen) && (
//           <div
//             onClick={() => {
//               setSidebarOpen(false);
//               setRightSidebarOpen(false);
//             }}
//             className="fixed inset-0 z-10 bg-gray-900/50 transition-opacity lg:hidden"
//           />
//         )}

//         {/* Edit Profile Modal */}
//         {editProfileModal && (
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen p-4">
//               <div
//                 onClick={() => setEditProfileModal(false)}
//                 className="fixed inset-0 bg-gray-800/80 backdrop-blur-lg transition-opacity"
//                 aria-hidden="true"
//               />
//               <div className="bg-white dark:bg-dark-primary rounded-3xl text-left overflow-hidden sm:w-[590px] transform transition-all p-5 sm:p-12">
//                 {/* Modal content */}
//                 <div className="absolute top-0 right-0 pt-4 pr-4">
//                   <button
//                     onClick={() => setEditProfileModal(false)}
//                     type="button"
//                     className="bg-gray-100 dark:bg-white/5 dark:text-gray-400 hover:bg-gray-200 rounded-full size-9 inline-flex items-center justify-center text-gray-500"
//                   >
//                     {/* Close icon */}
//                   </button>
//                 </div>
//                 <div className="mt-3 text-left w-full">
//                   <h3 className="text-[30px] mb-2 leading-[38px] font-bold text-gray-800 dark:text-white/90">Edit Account Info</h3>
//                   {/* Form content */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Change Password Modal */}
//         {changePasswordModal && (
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen p-4">
//               <div
//                 onClick={() => setChangePasswordModal(false)}
//                 className="fixed inset-0 bg-gray-800/80 backdrop-blur-lg transition-opacity"
//                 aria-hidden="true"
//               />
//               <div className="bg-white dark:bg-dark-primary rounded-3xl text-left overflow-hidden sm:w-[590px] transform transition-all p-5 sm:p-12">
//                 {/* Modal content */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiWifi, 
//   FiActivity, 
//   FiDollarSign, 
//   FiSettings, 
//   FiHelpCircle,
//   FiBell,
//   FiUser,
//   FiArrowUp,
//   FiArrowDown,
//   FiDownload,
//   FiUpload,
//   FiClock,
//   FiCalendar,
//   FiTrendingUp,
//   FiAlertTriangle,
//   FiCheckCircle,
//   FiMenu,
//   FiX
// } from 'react-icons/fi';

// // Particle Background Component (Reusing from previous)
// const ParticleBackground = () => {
//   return (
//     <div className="absolute inset-0 opacity-5">
//       {/* Simplified particle effect for dashboard */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
//     </div>
//   );
// };

// const Dashboard = () => {

//   const navigate = useNavigate()
//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token')
//       const response = await axios.get('http://localhost:3000/auth/', {
//         headers: {
//           "Authorization" : `Bearer ${token}`
//         }
//       })
//       if (response.status !== 201) {
//         navigate('/login')
//       }
//     } catch (error) {
//       navigate('/login')
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchUser()
//   }, [])

//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [notifications, setNotifications] = useState([]);

//   // Mock data
//   const userData = {
//     name: "Alex Johnson",
//     plan: "Business Pro",
//     speed: "500 Mbps",
//     dataUsed: 324.5,
//     dataLimit: 1000,
//     monthlyBill: 89.99,
//     nextBilling: "2024-01-15",
//     connectionStatus: "active",
//     uptime: "99.98%"
//   };

//   const usageStats = {
//     download: 245.6,
//     upload: 78.3,
//     latency: 12,
//     dataRemaining: 675.5
//   };

//   const recentActivity = [
//     { id: 1, type: 'download', amount: '45.2 GB', time: '2 hours ago', status: 'completed' },
//     { id: 2, type: 'streaming', amount: '12.8 GB', time: '4 hours ago', status: 'completed' },
//     { id: 3, type: 'upload', amount: '8.1 GB', time: '6 hours ago', status: 'completed' },
//     { id: 4, type: 'gaming', amount: '3.2 GB', time: '8 hours ago', status: 'completed' }
//   ];

//   const serviceAlerts = [
//     { id: 1, type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '5 hours ago' },
//     { id: 2, type: 'success', message: 'Your connection speed has been upgraded', time: '1 day ago' }
//   ];

//   useEffect(() => {
//     // Simulate fetching notifications
//     setNotifications([
//       { id: 1, type: 'bill', message: 'Monthly bill ready', read: false },
//       { id: 2, type: 'usage', message: "You've used 80% of your data", read: false }
//     ]);
//   }, []);

//   const DataUsageMeter = ({ used, total, label }) => {
//     const percentage = (used / total) * 100;
//     return (
//       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-white font-semibold">{label}</h3>
//           <span className="text-cyan-400 font-bold">{used} GB / {total} GB</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-3">
//           <motion.div
//             className={`h-3 rounded-full ${
//               percentage > 90 ? 'bg-red-500' : 
//               percentage > 75 ? 'bg-yellow-500' : 'bg-cyan-500'
//             }`}
//             initial={{ width: 0 }}
//             animate={{ width: `${percentage}%` }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//         </div>
//         <div className="flex justify-between text-sm text-gray-300 mt-2">
//           <span>0 GB</span>
//           <span>{total} GB</span>
//         </div>
//       </div>
//     );
//   };

//   const StatCard = ({ icon: Icon, value, label, change, trend }) => (
//     <motion.div
//       className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
//       whileHover={{ y: -5, scale: 1.02 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-300 text-sm">{label}</p>
//           <p className="text-2xl font-bold text-white mt-2">{value}</p>
//           {change && (
//             <div className={`flex items-center gap-1 mt-2 text-sm ${
//               trend === 'up' ? 'text-green-400' : 'text-red-400'
//             }`}>
//               {trend === 'up' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
//               <span>{change}</span>
//             </div>
//           )}
//         </div>
//         <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
//           <Icon className="w-6 h-6 text-cyan-400" />
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
//       <ParticleBackground />
      
//       {/* Mobile Header */}
//       <motion.header 
//         className="lg:hidden bg-white/10 backdrop-blur-md border-b border-white/20 p-4"
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//       >
//         <div className="flex items-center justify-between">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//           </button>
//           <h1 className="text-xl font-bold">REXIFI DASHBOARD</h1>
//           <div className="relative">
//             <FiBell className="w-6 h-6" />
//             {notifications.filter(n => !n.read).length > 0 && (
//               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//             )}
//           </div>
//         </div>
//       </motion.header>

//       <div className="flex">
//         {/* Sidebar */}
//         <AnimatePresence>
//           {(sidebarOpen || window.innerWidth >= 1024) && (
//             <motion.aside
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen fixed lg:static z-40"
//             >
//               <div className="p-6">
//                 {/* Logo */}
//                 <motion.div
//                   className="flex items-center gap-3 mb-8"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                     <FiWifi className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-xl font-bold">REXIFI</span>
//                 </motion.div>

//                 {/* User Profile */}
//                 <motion.div
//                   className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
//                   whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                       <FiUser className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{userData.name}</p>
//                       <p className="text-cyan-400 text-sm">{userData.plan}</p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Navigation */}
//                 <nav className="space-y-2">
//                   {[
//                     { id: 'overview', icon: FiActivity, label: 'Overview' },
//                     { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics' },
//                     { id: 'billing', icon: FiDollarSign, label: 'Billing' },
//                     { id: 'settings', icon: FiSettings, label: 'Settings' },
//                     { id: 'support', icon: FiHelpCircle, label: 'Support' }
//                   ].map((item) => (
//                     <motion.button
//                       key={item.id}
//                       onClick={() => setActiveTab(item.id)}
//                       className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
//                         activeTab === item.id 
//                           ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
//                           : 'text-gray-300 hover:bg-white/5'
//                       }`}
//                       whileHover={{ x: 5 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </motion.button>
//                   ))}
//                 </nav>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-6 lg:p-8">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <div>
//               <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
//               <p className="text-gray-300">Here's your connection overview</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <FiBell className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-colors" />
//                 {notifications.filter(n => !n.read).length > 0 && (
//                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//                 )}
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer">
//                 <FiUser className="w-5 h-5 text-white" />
//               </div>
//             </div>
//           </motion.div>

//           {/* Status Alert */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center gap-3"
//           >
//             <FiCheckCircle className="w-5 h-5 text-green-400" />
//             <div>
//               <p className="font-semibold text-green-400">Connection Active</p>
//               <p className="text-green-300 text-sm">Your internet is running smoothly</p>
//             </div>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             <StatCard
//               icon={FiDownload}
//               value={`${usageStats.download} Mbps`}
//               label="Download Speed"
//               change="+5.2%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiUpload}
//               value={`${usageStats.upload} Mbps`}
//               label="Upload Speed"
//               change="+2.1%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiActivity}
//               value={`${usageStats.latency} ms`}
//               label="Latency"
//               change="-1.5%"
//               trend="down"
//             />
//             <StatCard
//               icon={FiClock}
//               value={userData.uptime}
//               label="Uptime This Month"
//             />
//           </motion.div>

//           {/* Data Usage */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
//           >
//             <DataUsageMeter 
//               used={userData.dataUsed} 
//               total={userData.dataLimit} 
//               label="Monthly Data Usage" 
//             />
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Billing Overview</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Current Plan</span>
//                   <span className="text-white font-semibold">{userData.plan}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Monthly Cost</span>
//                   <span className="text-cyan-400 font-bold">${userData.monthlyBill}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Next Billing</span>
//                   <span className="text-white">{userData.nextBilling}</span>
//                 </div>
//                 <motion.button
//                   className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors mt-4"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Manage Subscription
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Recent Activity & Alerts */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
//           >
//             {/* Recent Activity */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <motion.div
//                     key={activity.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
//                         <FiActivity className="w-4 h-4 text-cyan-400" />
//                       </div>
//                       <div>
//                         <p className="text-white font-medium capitalize">{activity.type}</p>
//                         <p className="text-gray-300 text-sm">{activity.time}</p>
//                       </div>
//                     </div>
//                     <span className="text-cyan-400 font-semibold">{activity.amount}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Service Alerts */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Service Alerts</h3>
//               <div className="space-y-4">
//                 {serviceAlerts.map((alert, index) => (
//                   <motion.div
//                     key={alert.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className={`p-4 rounded-lg border ${
//                       alert.type === 'info' 
//                         ? 'bg-blue-500/20 border-blue-500/30' 
//                         : 'bg-green-500/20 border-green-500/30'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       {alert.type === 'info' ? (
//                         <FiAlertTriangle className="w-5 h-5 text-blue-400" />
//                       ) : (
//                         <FiCheckCircle className="w-5 h-5 text-green-400" />
//                       )}
//                       <div>
//                         <p className="text-white">{alert.message}</p>
//                         <p className="text-gray-300 text-sm">{alert.time}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


























// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiWifi, 
//   FiActivity, 
//   FiDollarSign, 
//   FiSettings, 
//   FiHelpCircle,
//   FiBell,
//   FiUser,
//   FiArrowUp,
//   FiArrowDown,
//   FiDownload,
//   FiUpload,
//   FiClock,
//   FiCalendar,
//   FiTrendingUp,
//   FiAlertTriangle,
//   FiCheckCircle,
//   FiMenu,
//   FiX,
//   FiLogOut,
//   FiChevronDown,
//   FiMessageCircle
// } from 'react-icons/fi';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// // Particle Background Component
// const ParticleBackground = () => {
//   return (
//     <div className="absolute inset-0 opacity-5">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
//     </div>
//   );
// };

// const Dashboard = () => {

//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [notifications, setNotifications] = useState([]);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();


//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token')
//       const response = await axios.get('http://localhost:3000/auth/', {
//         headers: {
//           "Authorization" : `Bearer ${token}`
//         }
//       })
//       if (response.status !== 201) {
//         navigate('/login')
//       }
//     } catch (error) {
//       navigate('/login')
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchUser()
//   }, [])



//   // Mock user data - in real app, this would come from your auth context or API
//   const mockUserData = {
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     plan: "Business Pro",
//     speed: "500 Mbps",
//     dataUsed: 324.5,
//     dataLimit: 1000,
//     monthlyBill: 89.99,
//     nextBilling: "2024-01-15",
//     connectionStatus: "active",
//     uptime: "99.98%"
//   };

//   const usageStats = {
//     download: 245.6,
//     upload: 78.3,
//     latency: 12,
//     dataRemaining: 675.5
//   };

//   const recentActivity = [
//     { id: 1, type: 'download', amount: '45.2 GB', time: '2 hours ago', status: 'completed' },
//     { id: 2, type: 'streaming', amount: '12.8 GB', time: '4 hours ago', status: 'completed' },
//     { id: 3, type: 'upload', amount: '8.1 GB', time: '6 hours ago', status: 'completed' },
//     { id: 4, type: 'gaming', amount: '3.2 GB', time: '8 hours ago', status: 'completed' }
//   ];

//   const serviceAlerts = [
//     { id: 1, type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '5 hours ago' },
//     { id: 2, type: 'success', message: 'Your connection speed has been upgraded', time: '1 day ago' }
//   ];

//   useEffect(() => {
//     // Get user data from localStorage or context
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     // In real app, you would fetch user data from API
//     setUserData(mockUserData);

//     // Simulate fetching notifications
//     setNotifications([
//       { id: 1, type: 'bill', message: 'Monthly bill ready', read: false },
//       { id: 2, type: 'usage', message: "You've used 80% of your data", read: false },
//       { id: 3, type: 'maintenance', message: 'Network maintenance scheduled', read: true }
//     ]);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const markAllNotificationsAsRead = () => {
//     setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//     setNotificationsDropdownOpen(false);
//   };

//   const DataUsageMeter = ({ used, total, label }) => {
//     const percentage = (used / total) * 100;
//     return (
//       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-white font-semibold">{label}</h3>
//           <span className="text-cyan-400 font-bold">{used} GB / {total} GB</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-3">
//           <motion.div
//             className={`h-3 rounded-full ${
//               percentage > 90 ? 'bg-red-500' : 
//               percentage > 75 ? 'bg-yellow-500' : 'bg-cyan-500'
//             }`}
//             initial={{ width: 0 }}
//             animate={{ width: `${percentage}%` }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//         </div>
//         <div className="flex justify-between text-sm text-gray-300 mt-2">
//           <span>0 GB</span>
//           <span>{total} GB</span>
//         </div>
//       </div>
//     );
//   };

//   const StatCard = ({ icon: Icon, value, label, change, trend }) => (
//     <motion.div
//       className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
//       whileHover={{ y: -5, scale: 1.02 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-300 text-sm">{label}</p>
//           <p className="text-2xl font-bold text-white mt-2">{value}</p>
//           {change && (
//             <div className={`flex items-center gap-1 mt-2 text-sm ${
//               trend === 'up' ? 'text-green-400' : 'text-red-400'
//             }`}>
//               {trend === 'up' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
//               <span>{change}</span>
//             </div>
//           )}
//         </div>
//         <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
//           <Icon className="w-6 h-6 text-cyan-400" />
//         </div>
//       </div>
//     </motion.div>
//   );

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-white text-xl"
//         >
//           Loading...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
//       <ParticleBackground />
      
//       {/* Mobile Header */}
//       <motion.header 
//         className="lg:hidden bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50"
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//       >
//         <div className="flex items-center justify-between">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//           </button>
//           <h1 className="text-xl font-bold">REXIFI DASHBOARD</h1>
//           <div className="flex items-center gap-4">
//             {/* Notification Bell for Mobile */}
//             <div className="relative">
//               <button onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}>
//                 <FiBell className="w-6 h-6" />
//               </button>
//               {notifications.filter(n => !n.read).length > 0 && (
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <div className="flex">
//         {/* Sidebar */}
//         <AnimatePresence>
//           {(sidebarOpen || window.innerWidth >= 1024) && (
//             <motion.aside
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-40"
//             >
//               <div className="p-6 flex flex-col h-full">
//                 {/* Logo */}
//                 <motion.div
//                   className="flex items-center gap-3 mb-8"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                     <FiWifi className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-xl font-bold">REXIFI</span>
//                 </motion.div>

//                 {/* User Profile */}
//                 <motion.div
//                   className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
//                   whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                       <FiUser className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{userData.name}</p>
//                       <p className="text-cyan-400 text-sm">{userData.plan}</p>
//                       <p className="text-gray-400 text-xs truncate">{userData.email}</p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Navigation */}
//                 <nav className="space-y-2 flex-1">
//                   {[
//                     { id: 'overview', icon: FiActivity, label: 'Overview' },
//                     { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics' },
//                     { id: 'billing', icon: FiDollarSign, label: 'Billing' },
//                     { id: 'settings', icon: FiSettings, label: 'Settings' },
//                     { id: 'support', icon: FiHelpCircle, label: 'Support' }
//                   ].map((item) => (
//                     <motion.button
//                       key={item.id}
//                       onClick={() => setActiveTab(item.id)}
//                       className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
//                         activeTab === item.id 
//                           ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
//                           : 'text-gray-300 hover:bg-white/5'
//                       }`}
//                       whileHover={{ x: 5 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </motion.button>
//                   ))}
//                 </nav>

//                 {/* Logout Button at Bottom */}
//                 <motion.button
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-400/30 transition-all mt-auto"
//                   whileHover={{ x: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiLogOut className="w-5 h-5" />
//                   <span>Logout</span>
//                 </motion.button>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-6 lg:p-8 min-h-screen">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <div>
//               <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
//               <p className="text-gray-300">Here's your connection overview</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* Notifications Dropdown */}
//               <div className="relative">
//                 <motion.button
//                   onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
//                   className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiBell className="w-6 h-6" />
//                   {notifications.filter(n => !n.read).length > 0 && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//                   )}
//                 </motion.button>

//                 <AnimatePresence>
//                   {notificationsDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
//                     >
//                       <div className="p-4 border-b border-white/20">
//                         <div className="flex justify-between items-center">
//                           <h3 className="font-semibold text-white">Notifications</h3>
//                           {notifications.filter(n => !n.read).length > 0 && (
//                             <button
//                               onClick={markAllNotificationsAsRead}
//                               className="text-cyan-400 text-sm hover:text-cyan-300"
//                             >
//                               Mark all as read
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.length > 0 ? (
//                           notifications.map((notification) => (
//                             <div
//                               key={notification.id}
//                               className={`p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${
//                                 !notification.read ? 'bg-cyan-500/10' : ''
//                               }`}
//                             >
//                               <p className="text-white text-sm">{notification.message}</p>
//                               <p className="text-gray-400 text-xs mt-1">{notification.type}</p>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="p-4 text-center text-gray-400">
//                             No notifications
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* User Dropdown */}
//               <div className="relative">
//                 <motion.button
//                   onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                     <FiUser className="w-5 h-5 text-white" />
//                   </div>
//                   <FiChevronDown className={`w-4 h-4 transition-transform ${
//                     userDropdownOpen ? 'rotate-180' : ''
//                   }`} />
//                 </motion.button>

//                 <AnimatePresence>
//                   {userDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
//                     >
//                       <div className="p-4 border-b border-white/20">
//                         <p className="font-semibold text-white">{userData.name}</p>
//                         <p className="text-gray-300 text-sm truncate">{userData.email}</p>
//                         <p className="text-cyan-400 text-xs mt-1">{userData.plan}</p>
//                       </div>
//                       <div className="p-2">
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Profile Settings
//                         </button>
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Billing Information
//                         </button>
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Support
//                         </button>
//                       </div>
//                       <div className="p-2 border-t border-white/20">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2"
//                         >
//                           <FiLogOut className="w-4 h-4" />
//                           Logout
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </motion.div>

//           {/* Rest of the dashboard content remains the same */}
//           {/* Status Alert */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center gap-3"
//           >
//             <FiCheckCircle className="w-5 h-5 text-green-400" />
//             <div>
//               <p className="font-semibold text-green-400">Connection Active</p>
//               <p className="text-green-300 text-sm">Your internet is running smoothly</p>
//             </div>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             <StatCard
//               icon={FiDownload}
//               value={`${usageStats.download} Mbps`}
//               label="Download Speed"
//               change="+5.2%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiUpload}
//               value={`${usageStats.upload} Mbps`}
//               label="Upload Speed"
//               change="+2.1%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiActivity}
//               value={`${usageStats.latency} ms`}
//               label="Latency"
//               change="-1.5%"
//               trend="down"
//             />
//             <StatCard
//               icon={FiClock}
//               value={userData.uptime}
//               label="Uptime This Month"
//             />
//           </motion.div>

//           {/* Data Usage */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
//           >
//             <DataUsageMeter 
//               used={userData.dataUsed} 
//               total={userData.dataLimit} 
//               label="Monthly Data Usage" 
//             />
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Billing Overview</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Current Plan</span>
//                   <span className="text-white font-semibold">{userData.plan}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Monthly Cost</span>
//                   <span className="text-cyan-400 font-bold">${userData.monthlyBill}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Next Billing</span>
//                   <span className="text-white">{userData.nextBilling}</span>
//                 </div>
//                 <motion.button
//                   className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors mt-4"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Manage Subscription
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Recent Activity & Alerts */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
//           >
//             {/* Recent Activity */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <motion.div
//                     key={activity.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
//                         <FiActivity className="w-4 h-4 text-cyan-400" />
//                       </div>
//                       <div>
//                         <p className="text-white font-medium capitalize">{activity.type}</p>
//                         <p className="text-gray-300 text-sm">{activity.time}</p>
//                       </div>
//                     </div>
//                     <span className="text-cyan-400 font-semibold">{activity.amount}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Service Alerts */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Service Alerts</h3>
//               <div className="space-y-4">
//                 {serviceAlerts.map((alert, index) => (
//                   <motion.div
//                     key={alert.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className={`p-4 rounded-lg border ${
//                       alert.type === 'info' 
//                         ? 'bg-blue-500/20 border-blue-500/30' 
//                         : 'bg-green-500/20 border-green-500/30'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       {alert.type === 'info' ? (
//                         <FiAlertTriangle className="w-5 h-5 text-blue-400" />
//                       ) : (
//                         <FiCheckCircle className="w-5 h-5 text-green-400" />
//                       )}
//                       <div>
//                         <p className="text-white">{alert.message}</p>
//                         <p className="text-gray-300 text-sm">{alert.time}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





























// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiWifi, 
//   FiActivity, 
//   FiDollarSign, 
//   FiSettings, 
//   FiHelpCircle,
//   FiBell,
//   FiUser,
//   FiArrowUp,
//   FiArrowDown,
//   FiDownload,
//   FiUpload,
//   FiClock,
//   FiCalendar,
//   FiTrendingUp,
//   FiAlertTriangle,
//   FiCheckCircle,
//   FiMenu,
//   FiX,
//   FiLogOut,
//   FiChevronDown,
//   FiMessageCircle
// } from 'react-icons/fi';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// // Particle Background Component
// const ParticleBackground = () => {
//   return (
//     <div className="absolute inset-0 opacity-5">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (window.innerWidth < 1024 && sidebarOpen) {
//         const sidebar = document.querySelector('aside');
//         const menuButton = document.querySelector('button[class*="lg:hidden"]');
        
//         if (sidebar && !sidebar.contains(event.target) && 
//             menuButton && !menuButton.contains(event.target)) {
//           setSidebarOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [sidebarOpen]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
//         setUserDropdownOpen(false);
//       }
//       if (notificationsDropdownOpen && !event.target.closest('.notifications-dropdown')) {
//         setNotificationsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [userDropdownOpen, notificationsDropdownOpen]);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const response = await axios.get('http://localhost:3000/auth/user', {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const response = await axios.get('http://localhost:3000/auth/', {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (response.status !== 200) {
//         navigate('/login');
//       } else {
//         // If home endpoint is successful, fetch user data
//         await fetchUserData();
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // Mock usage data - you can replace this with real API calls
//   const usageStats = {
//     download: 245.6,
//     upload: 78.3,
//     latency: 12,
//     dataRemaining: 675.5
//   };

//   const recentActivity = [
//     { id: 1, type: 'download', amount: '45.2 GB', time: '2 hours ago', status: 'completed' },
//     { id: 2, type: 'streaming', amount: '12.8 GB', time: '4 hours ago', status: 'completed' },
//     { id: 3, type: 'upload', amount: '8.1 GB', time: '6 hours ago', status: 'completed' },
//     { id: 4, type: 'gaming', amount: '3.2 GB', time: '8 hours ago', status: 'completed' }
//   ];

//   const serviceAlerts = [
//     { id: 1, type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '5 hours ago' },
//     { id: 2, type: 'success', message: 'Your connection speed has been upgraded', time: '1 day ago' }
//   ];

//   useEffect(() => {
//     // Simulate fetching notifications
//     if (userData) {
//       setNotifications([
//         { id: 1, type: 'bill', message: 'Monthly bill ready', read: false },
//         { id: 2, type: 'usage', message: "You've used 80% of your data", read: false },
//         { id: 3, type: 'maintenance', message: 'Network maintenance scheduled', read: true }
//       ]);
//     }
//   }, [userData]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const markAllNotificationsAsRead = () => {
//     setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//     setNotificationsDropdownOpen(false);
//   };

//   const DataUsageMeter = ({ used, total, label }) => {
//     const percentage = (used / total) * 100;
//     return (
//       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-white font-semibold">{label}</h3>
//           <span className="text-cyan-400 font-bold">{used} GB / {total} GB</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-3">
//           <motion.div
//             className={`h-3 rounded-full ${
//               percentage > 90 ? 'bg-red-500' : 
//               percentage > 75 ? 'bg-yellow-500' : 'bg-cyan-500'
//             }`}
//             initial={{ width: 0 }}
//             animate={{ width: `${percentage}%` }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//         </div>
//         <div className="flex justify-between text-sm text-gray-300 mt-2">
//           <span>0 GB</span>
//           <span>{total} GB</span>
//         </div>
//       </div>
//     );
//   };

//   const StatCard = ({ icon: Icon, value, label, change, trend }) => (
//     <motion.div
//       className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
//       whileHover={{ y: -5, scale: 1.02 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-300 text-sm">{label}</p>
//           <p className="text-2xl font-bold text-white mt-2">{value}</p>
//           {change && (
//             <div className={`flex items-center gap-1 mt-2 text-sm ${
//               trend === 'up' ? 'text-green-400' : 'text-red-400'
//             }`}>
//               {trend === 'up' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
//               <span>{change}</span>
//             </div>
//           )}
//         </div>
//         <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
//           <Icon className="w-6 h-6 text-cyan-400" />
//         </div>
//       </div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-white text-xl"
//         >
//           Loading...
//         </motion.div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-white text-xl text-center"
//         >
//           Unable to load user data. <br />
//           <button 
//             onClick={() => navigate('/login')}
//             className="text-cyan-400 hover:text-cyan-300 mt-4"
//           >
//             Return to Login
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
//       <ParticleBackground />
      
//       {/* Mobile Header */}
//       <motion.header 
//         className="lg:hidden bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50"
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//       >
//         <div className="flex items-center justify-between">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <FiMenu className="w-6 h-6" />
//           </button>
//           <h1 className="text-xl font-bold">REXIFI DASHBOARD</h1>
//           <div className="flex items-center gap-4">
//             {/* Notification Bell for Mobile */}
//             <div className="relative notifications-dropdown">
//               <button onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}>
//                 <FiBell className="w-6 h-6" />
//               </button>
//               {notifications.filter(n => !n.read).length > 0 && (
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <div className="flex">
//         {/* Sidebar Overlay for Mobile */}
//         <AnimatePresence>
//           {sidebarOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//               onClick={() => setSidebarOpen(false)}
//             />
//           )}
//         </AnimatePresence>

//         {/* Sidebar */}
//         <AnimatePresence>
//           {(sidebarOpen || window.innerWidth >= 1024) && (
//             <motion.aside
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-40 fixed lg:relative"
//             >
//               <div className="p-6 flex flex-col h-full">
//                 {/* Close button for mobile */}
//                 <div className="flex items-center justify-between mb-8 lg:hidden">
//                   <motion.div
//                     className="flex items-center gap-3"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                       <FiWifi className="w-6 h-6 text-white" />
//                     </div>
//                     <span className="text-xl font-bold">REXIFI</span>
//                   </motion.div>
//                   <button onClick={() => setSidebarOpen(false)}>
//                     <FiX className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {/* Logo for desktop */}
//                 <motion.div
//                   className="hidden lg:flex items-center gap-3 mb-8"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                     <FiWifi className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-xl font-bold">REXIFI</span>
//                 </motion.div>

//                 {/* User Profile */}
//                 <motion.div
//                   className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
//                   whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                       <FiUser className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{userData.username || 'User'}</p>
//                       <p className="text-cyan-400 text-sm">{userData.plan || 'Standard Plan'}</p>
//                       <p className="text-gray-400 text-xs truncate">{userData.email}</p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Navigation */}
//                 <nav className="space-y-2 flex-1">
//                   {[
//                     { id: 'overview', icon: FiActivity, label: 'Overview' },
//                     { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics' },
//                     { id: 'billing', icon: FiDollarSign, label: 'Billing' },
//                     { id: 'settings', icon: FiSettings, label: 'Settings' },
//                     { id: 'support', icon: FiHelpCircle, label: 'Support' }
//                   ].map((item) => (
//                     <motion.button
//                       key={item.id}
//                       onClick={() => {
//                         setActiveTab(item.id);
//                         if (window.innerWidth < 1024) {
//                           setSidebarOpen(false);
//                         }
//                       }}
//                       className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
//                         activeTab === item.id 
//                           ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
//                           : 'text-gray-300 hover:bg-white/5'
//                       }`}
//                       whileHover={{ x: 5 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </motion.button>
//                   ))}
//                 </nav>

//                 {/* Logout Button at Bottom */}
//                 <motion.button
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-400/30 transition-all mt-auto"
//                   whileHover={{ x: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiLogOut className="w-5 h-5" />
//                   <span>Logout</span>
//                 </motion.button>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-6 lg:p-8 min-h-screen w-full lg:w-auto">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <div>
//               <h1 className="text-3xl font-bold">Welcome back, {userData.username || 'User'}!</h1>
//               <p className="text-gray-300">Here's your connection overview</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* Notifications Dropdown */}
//               <div className="relative notifications-dropdown">
//                 <motion.button
//                   onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
//                   className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiBell className="w-6 h-6" />
//                   {notifications.filter(n => !n.read).length > 0 && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//                   )}
//                 </motion.button>

//                 <AnimatePresence>
//                   {notificationsDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
//                     >
//                       <div className="p-4 border-b border-white/20">
//                         <div className="flex justify-between items-center">
//                           <h3 className="font-semibold text-white">Notifications</h3>
//                           {notifications.filter(n => !n.read).length > 0 && (
//                             <button
//                               onClick={markAllNotificationsAsRead}
//                               className="text-cyan-400 text-sm hover:text-cyan-300"
//                             >
//                               Mark all as read
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.length > 0 ? (
//                           notifications.map((notification) => (
//                             <div
//                               key={notification.id}
//                               className={`p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${
//                                 !notification.read ? 'bg-cyan-500/10' : ''
//                               }`}
//                             >
//                               <p className="text-white text-sm">{notification.message}</p>
//                               <p className="text-gray-400 text-xs mt-1">{notification.type}</p>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="p-4 text-center text-gray-400">
//                             No notifications
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* User Dropdown */}
//               <div className="relative user-dropdown">
//                 <motion.button
//                   onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                     <FiUser className="w-5 h-5 text-white" />
//                   </div>
//                   <FiChevronDown className={`w-4 h-4 transition-transform ${
//                     userDropdownOpen ? 'rotate-180' : ''
//                   }`} />
//                 </motion.button>

//                 <AnimatePresence>
//                   {userDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
//                     >
//                       <div className="p-4 border-b border-white/20">
//                         <p className="font-semibold text-white">{userData.username || 'User'}</p>
//                         <p className="text-gray-300 text-sm truncate">{userData.email}</p>
//                         <p className="text-cyan-400 text-xs mt-1">{userData.plan || 'Standard Plan'}</p>
//                       </div>
//                       <div className="p-2">
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Profile Settings
//                         </button>
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Billing Information
//                         </button>
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Support
//                         </button>
//                       </div>
//                       <div className="p-2 border-t border-white/20">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2"
//                         >
//                           <FiLogOut className="w-4 h-4" />
//                           Logout
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </motion.div>

//           {/* Rest of the dashboard content remains the same */}
//           {/* Status Alert */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center gap-3"
//           >
//             <FiCheckCircle className="w-5 h-5 text-green-400" />
//             <div>
//               <p className="font-semibold text-green-400">Connection Active</p>
//               <p className="text-green-300 text-sm">Your internet is running smoothly</p>
//             </div>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             <StatCard
//               icon={FiDownload}
//               value={`${usageStats.download} Mbps`}
//               label="Download Speed"
//               change="+5.2%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiUpload}
//               value={`${usageStats.upload} Mbps`}
//               label="Upload Speed"
//               change="+2.1%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiActivity}
//               value={`${usageStats.latency} ms`}
//               label="Latency"
//               change="-1.5%"
//               trend="down"
//             />
//             <StatCard
//               icon={FiClock}
//               value={"99.98%"}
//               label="Uptime This Month"
//             />
//           </motion.div>

//           {/* Data Usage */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
//           >
//             <DataUsageMeter 
//               used={324.5} 
//               total={1000} 
//               label="Monthly Data Usage" 
//             />
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Billing Overview</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Current Plan</span>
//                   <span className="text-white font-semibold">{userData.plan || 'Standard Plan'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Monthly Cost</span>
//                   <span className="text-cyan-400 font-bold">$89.99</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Next Billing</span>
//                   <span className="text-white">2024-01-15</span>
//                 </div>
//                 <motion.button
//                   className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors mt-4"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Manage Subscription
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Recent Activity & Alerts */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
//           >
//             {/* Recent Activity */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <motion.div
//                     key={activity.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
//                         <FiActivity className="w-4 h-4 text-cyan-400" />
//                       </div>
//                       <div>
//                         <p className="text-white font-medium capitalize">{activity.type}</p>
//                         <p className="text-gray-300 text-sm">{activity.time}</p>
//                       </div>
//                     </div>
//                     <span className="text-cyan-400 font-semibold">{activity.amount}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Service Alerts */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Service Alerts</h3>
//               <div className="space-y-4">
//                 {serviceAlerts.map((alert, index) => (
//                   <motion.div
//                     key={alert.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className={`p-4 rounded-lg border ${
//                       alert.type === 'info' 
//                         ? 'bg-blue-500/20 border-blue-500/30' 
//                         : 'bg-green-500/20 border-green-500/30'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       {alert.type === 'info' ? (
//                         <FiAlertTriangle className="w-5 h-5 text-blue-400" />
//                       ) : (
//                         <FiCheckCircle className="w-5 h-5 text-green-400" />
//                       )}
//                       <div>
//                         <p className="text-white">{alert.message}</p>
//                         <p className="text-gray-300 text-sm">{alert.time}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

















// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiWifi, 
//   FiActivity, 
//   FiDollarSign, 
//   FiSettings, 
//   FiHelpCircle,
//   FiBell,
//   FiUser,
//   FiArrowUp,
//   FiArrowDown,
//   FiDownload,
//   FiUpload,
//   FiClock,
//   FiCalendar,
//   FiTrendingUp,
//   FiAlertTriangle,
//   FiCheckCircle,
//   FiMenu,
//   FiX,
//   FiLogOut,
//   FiChevronDown,
//   FiMessageCircle
// } from 'react-icons/fi';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// // Particle Background Component
// const ParticleBackground = () => {
//   return (
//     <div className="absolute inset-0 opacity-5">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (window.innerWidth < 1024 && sidebarOpen) {
//         const sidebar = document.querySelector('aside');
//         const menuButton = document.querySelector('button[class*="lg:hidden"]');
        
//         if (sidebar && !sidebar.contains(event.target) && 
//             menuButton && !menuButton.contains(event.target)) {
//           setSidebarOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [sidebarOpen]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
//         setUserDropdownOpen(false);
//       }
//       if (notificationsDropdownOpen && !event.target.closest('.notifications-dropdown')) {
//         setNotificationsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [userDropdownOpen, notificationsDropdownOpen]);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       // Try to get user data from your backend
//       const response = await axios.get('http://localhost:3000/auth/user', {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // If user endpoint fails, use mock data but don't redirect
//       setUserData({
//         username: "User",
//         email: "user@example.com",
//         plan: "Standard Plan"
//       });
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log('Token from localStorage:', token); // Debug log
      
//       if (!token) {
//         console.log('No token found, redirecting to login'); // Debug log
//         navigate('/login');
//         return;
//       }

//       // First, check if the token is valid by calling a simple endpoint
//       const response = await axios.get('http://localhost:3000/auth/', {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       console.log('Auth check response status:', response.status); // Debug log
      
//       // If we get any successful response (200 or 201), consider it valid
//       if (response.status === 200 || response.status === 201) {
//         console.log('Auth successful, fetching user data'); // Debug log
//         await fetchUserData();
//       } else {
//         console.log('Unexpected status, redirecting to login'); // Debug log
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       console.log('Error response:', error.response); // Debug log
      
//       // If there's an error, check if it's a 401 unauthorized
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       } else {
//         // For other errors (network issues, etc.), still show dashboard with mock data
//         console.log('Using mock data due to error'); // Debug log
//         setUserData({
//           username: "User",
//           email: "user@example.com", 
//           plan: "Standard Plan"
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // Mock usage data
//   const usageStats = {
//     download: 245.6,
//     upload: 78.3,
//     latency: 12,
//     dataRemaining: 675.5
//   };

//   const recentActivity = [
//     { id: 1, type: 'download', amount: '45.2 GB', time: '2 hours ago', status: 'completed' },
//     { id: 2, type: 'streaming', amount: '12.8 GB', time: '4 hours ago', status: 'completed' },
//     { id: 3, type: 'upload', amount: '8.1 GB', time: '6 hours ago', status: 'completed' },
//     { id: 4, type: 'gaming', amount: '3.2 GB', time: '8 hours ago', status: 'completed' }
//   ];

//   const serviceAlerts = [
//     { id: 1, type: 'info', message: 'Scheduled maintenance tonight at 2 AM', time: '5 hours ago' },
//     { id: 2, type: 'success', message: 'Your connection speed has been upgraded', time: '1 day ago' }
//   ];

//   useEffect(() => {
//     // Simulate fetching notifications
//     if (userData) {
//       setNotifications([
//         { id: 1, type: 'bill', message: 'Monthly bill ready', read: false },
//         { id: 2, type: 'usage', message: "You've used 80% of your data", read: false },
//         { id: 3, type: 'maintenance', message: 'Network maintenance scheduled', read: true }
//       ]);
//     }
//   }, [userData]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const markAllNotificationsAsRead = () => {
//     setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//     setNotificationsDropdownOpen(false);
//   };

//   const DataUsageMeter = ({ used, total, label }) => {
//     const percentage = (used / total) * 100;
//     return (
//       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-white font-semibold">{label}</h3>
//           <span className="text-cyan-400 font-bold">{used} GB / {total} GB</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-3">
//           <motion.div
//             className={`h-3 rounded-full ${
//               percentage > 90 ? 'bg-red-500' : 
//               percentage > 75 ? 'bg-yellow-500' : 'bg-cyan-500'
//             }`}
//             initial={{ width: 0 }}
//             animate={{ width: `${percentage}%` }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//         </div>
//         <div className="flex justify-between text-sm text-gray-300 mt-2">
//           <span>0 GB</span>
//           <span>{total} GB</span>
//         </div>
//       </div>
//     );
//   };

//   const StatCard = ({ icon: Icon, value, label, change, trend }) => (
//     <motion.div
//       className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all"
//       whileHover={{ y: -5, scale: 1.02 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-300 text-sm">{label}</p>
//           <p className="text-2xl font-bold text-white mt-2">{value}</p>
//           {change && (
//             <div className={`flex items-center gap-1 mt-2 text-sm ${
//               trend === 'up' ? 'text-green-400' : 'text-red-400'
//             }`}>
//               {trend === 'up' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
//               <span>{change}</span>
//             </div>
//           )}
//         </div>
//         <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
//           <Icon className="w-6 h-6 text-cyan-400" />
//         </div>
//       </div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-white text-xl"
//         >
//           Loading Dashboard...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
//       <ParticleBackground />
      
//       {/* Mobile Header */}
//       <motion.header 
//         className="lg:hidden bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50"
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//       >
//         <div className="flex items-center justify-between">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <FiMenu className="w-6 h-6" />
//           </button>
//           <h1 className="text-xl font-bold">REXIFI DASHBOARD</h1>
//           <div className="flex items-center gap-4">
//             {/* Notification Bell for Mobile */}
//             <div className="relative notifications-dropdown">
//               <button onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}>
//                 <FiBell className="w-6 h-6" />
//               </button>
//               {notifications.filter(n => !n.read).length > 0 && (
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <div className="flex">
//         {/* Sidebar Overlay for Mobile */}
//         <AnimatePresence>
//           {sidebarOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//               onClick={() => setSidebarOpen(false)}
//             />
//           )}
//         </AnimatePresence>

//         {/* Sidebar */}
//         <AnimatePresence>
//           {(sidebarOpen || window.innerWidth >= 1024) && (
//             <motion.aside
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-40 fixed lg:relative"
//             >
//               <div className="p-6 flex flex-col h-full">
//                 {/* Close button for mobile */}
//                 <div className="flex items-center justify-between mb-8 lg:hidden">
//                   <motion.div
//                     className="flex items-center gap-3"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                       <FiWifi className="w-6 h-6 text-white" />
//                     </div>
//                     <span className="text-xl font-bold">REXIFI</span>
//                   </motion.div>
//                   <button onClick={() => setSidebarOpen(false)}>
//                     <FiX className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {/* Logo for desktop */}
//                 <motion.div
//                   className="hidden lg:flex items-center gap-3 mb-8"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                     <FiWifi className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-xl font-bold">REXIFI</span>
//                 </motion.div>

//                 {/* User Profile */}
//                 <motion.div
//                   className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10"
//                   whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                       <FiUser className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{userData?.username || 'User'}</p>
//                       <p className="text-cyan-400 text-sm">{userData?.plan || 'Standard Plan'}</p>
//                       <p className="text-gray-400 text-xs truncate">{userData?.email || 'user@example.com'}</p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Navigation */}
//                 <nav className="space-y-2 flex-1">
//                   {[
//                     { id: 'overview', icon: FiActivity, label: 'Overview' },
//                     { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics' },
//                     { id: 'billing', icon: FiDollarSign, label: 'Billing' },
//                     { id: 'settings', icon: FiSettings, label: 'Settings' },
//                     { id: 'support', icon: FiHelpCircle, label: 'Support' }
//                   ].map((item) => (
//                     <motion.button
//                       key={item.id}
//                       onClick={() => {
//                         setActiveTab(item.id);
//                         if (window.innerWidth < 1024) {
//                           setSidebarOpen(false);
//                         }
//                       }}
//                       className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
//                         activeTab === item.id 
//                           ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
//                           : 'text-gray-300 hover:bg-white/5'
//                       }`}
//                       whileHover={{ x: 5 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </motion.button>
//                   ))}
//                 </nav>

//                 {/* Logout Button at Bottom */}
//                 <motion.button
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-400/30 transition-all mt-auto"
//                   whileHover={{ x: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiLogOut className="w-5 h-5" />
//                   <span>Logout</span>
//                 </motion.button>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className="flex-1 p-6 lg:p-8 min-h-screen w-full lg:w-auto">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <div>
//               <h1 className="text-3xl font-bold">Welcome back, {userData?.username || 'User'}!</h1>
//               <p className="text-gray-300">Here's your connection overview</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* Notifications Dropdown */}
//               <div className="relative notifications-dropdown">
//                 <motion.button
//                   onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
//                   className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiBell className="w-6 h-6" />
//                   {notifications.filter(n => !n.read).length > 0 && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//                   )}
//                 </motion.button>

//                 <AnimatePresence>
//                   {notificationsDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
//                     >
//                       <div className="p-4 border-b border-white/20">
//                         <div className="flex justify-between items-center">
//                           <h3 className="font-semibold text-white">Notifications</h3>
//                           {notifications.filter(n => !n.read).length > 0 && (
//                             <button
//                               onClick={markAllNotificationsAsRead}
//                               className="text-cyan-400 text-sm hover:text-cyan-300"
//                             >
//                               Mark all as read
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.length > 0 ? (
//                           notifications.map((notification) => (
//                             <div
//                               key={notification.id}
//                               className={`p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${
//                                 !notification.read ? 'bg-cyan-500/10' : ''
//                               }`}
//                             >
//                               <p className="text-white text-sm">{notification.message}</p>
//                               <p className="text-gray-400 text-xs mt-1">{notification.type}</p>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="p-4 text-center text-gray-400">
//                             No notifications
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* User Dropdown */}
//               <div className="relative user-dropdown">
//                 <motion.button
//                   onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                     <FiUser className="w-5 h-5 text-white" />
//                   </div>
//                   <FiChevronDown className={`w-4 h-4 transition-transform ${
//                     userDropdownOpen ? 'rotate-180' : ''
//                   }`} />
//                 </motion.button>

//                 <AnimatePresence>
//                   {userDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
//                     >
//                       <div className="p-4 border-b border-white/20">
//                         <p className="font-semibold text-white">{userData?.username || 'User'}</p>
//                         <p className="text-gray-300 text-sm truncate">{userData?.email || 'user@example.com'}</p>
//                         <p className="text-cyan-400 text-xs mt-1">{userData?.plan || 'Standard Plan'}</p>
//                       </div>
//                       <div className="p-2">
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Profile Settings
//                         </button>
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Billing Information
//                         </button>
//                         <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
//                           Support
//                         </button>
//                       </div>
//                       <div className="p-2 border-t border-white/20">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2"
//                         >
//                           <FiLogOut className="w-4 h-4" />
//                           Logout
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </motion.div>

//           {/* Rest of the dashboard content remains the same */}
//           {/* Status Alert */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center gap-3"
//           >
//             <FiCheckCircle className="w-5 h-5 text-green-400" />
//             <div>
//               <p className="font-semibold text-green-400">Connection Active</p>
//               <p className="text-green-300 text-sm">Your internet is running smoothly</p>
//             </div>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             <StatCard
//               icon={FiDownload}
//               value={`${usageStats.download} Mbps`}
//               label="Download Speed"
//               change="+5.2%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiUpload}
//               value={`${usageStats.upload} Mbps`}
//               label="Upload Speed"
//               change="+2.1%"
//               trend="up"
//             />
//             <StatCard
//               icon={FiActivity}
//               value={`${usageStats.latency} ms`}
//               label="Latency"
//               change="-1.5%"
//               trend="down"
//             />
//             <StatCard
//               icon={FiClock}
//               value={"99.98%"}
//               label="Uptime This Month"
//             />
//           </motion.div>

//           {/* Data Usage */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
//           >
//             <DataUsageMeter 
//               used={324.5} 
//               total={1000} 
//               label="Monthly Data Usage" 
//             />
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Billing Overview</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Current Plan</span>
//                   <span className="text-white font-semibold">{userData?.plan || 'Standard Plan'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Monthly Cost</span>
//                   <span className="text-cyan-400 font-bold">$89.99</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Next Billing</span>
//                   <span className="text-white">2024-01-15</span>
//                 </div>
//                 <motion.button
//                   className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors mt-4"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Manage Subscription
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Recent Activity & Alerts */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
//           >
//             {/* Recent Activity */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <motion.div
//                     key={activity.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
//                         <FiActivity className="w-4 h-4 text-cyan-400" />
//                       </div>
//                       <div>
//                         <p className="text-white font-medium capitalize">{activity.type}</p>
//                         <p className="text-gray-300 text-sm">{activity.time}</p>
//                       </div>
//                     </div>
//                     <span className="text-cyan-400 font-semibold">{activity.amount}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Service Alerts */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//               <h3 className="text-white font-semibold mb-4">Service Alerts</h3>
//               <div className="space-y-4">
//                 {serviceAlerts.map((alert, index) => (
//                   <motion.div
//                     key={alert.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className={`p-4 rounded-lg border ${
//                       alert.type === 'info' 
//                         ? 'bg-blue-500/20 border-blue-500/30' 
//                         : 'bg-green-500/20 border-green-500/30'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       {alert.type === 'info' ? (
//                         <FiAlertTriangle className="w-5 h-5 text-blue-400" />
//                       ) : (
//                         <FiCheckCircle className="w-5 h-5 text-green-400" />
//                       )}
//                       <div>
//                         <p className="text-white">{alert.message}</p>
//                         <p className="text-gray-300 text-sm">{alert.time}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;










import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiWifi, 
  FiActivity, 
  FiDollarSign, 
  FiSettings, 
  FiHelpCircle,
  FiBell,
  FiUser,
  FiArrowUp,
  FiArrowDown,
  FiDownload,
  FiUpload,
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiAlertTriangle,
  FiCheckCircle,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
  FiMessageCircle
} from 'react-icons/fi';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

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

      // Use the /auth/ endpoint that returns user data
      const response = await axios.get('http://localhost:3000/auth/', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      console.log('User data response:', response.data); // Debug log

      if (response.status === 201 && response.data.user) {
        setUserData(response.data.user);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Only use mock data as last resort
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      // For other errors, show error but don't use mock data
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
      console.log('Token from localStorage:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      // Directly fetch user data from /auth/ endpoint
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

  // Mock usage data - you can replace these with real API calls later
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
    // Simulate fetching notifications
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
      <motion.header 
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
            {/* Notification Bell for Mobile */}
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
                      <FiWifi className="w-6 h-6 text-white" />
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
                {/* <nav className="space-y-2 flex-1">
                  {[
                    { id: 'overview', icon: FiActivity, label: 'Overview' },
                    { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics' },
                    { id: 'billing', icon: FiDollarSign, label: 'Billing' },
                    { id: 'settings', icon: FiSettings, label: 'Settings' },
                    { id: 'support', icon: FiHelpCircle, label: 'Support' }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
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
                </nav> */}
                <nav className="space-y-2 flex-1">
                  {[
                    { id: 'overview', icon: FiActivity, label: 'Overview', path: '/dashboard' },
                    { id: 'usage', icon: FiTrendingUp, label: 'Usage Analytics', path: '/usage' },
                    { id: 'billing', icon: FiDollarSign, label: 'Billing', path: '/billing' },
                    { id: 'settings', icon: FiSettings, label: 'Settings', path: '/settings' },
                    { id: 'support', icon: FiHelpCircle, label: 'Support', path: '/support' }
                  ].map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => {
                          setActiveTab(item.id);
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          activeTab === item.id 
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
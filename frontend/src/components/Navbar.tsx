// import React, { useEffect, useState, useRef, createContext, useContext } from "react";
// import { Link } from 'react-router-dom';
// import { FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
// // import { motion } from "framer-motion";

// import logo from "../assets/img/logo.png";

// // Define types for theme context
// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// interface ThemeProviderProps {
//   children: React.ReactNode;
// }

// interface DropdownItem {
//   label: string;
//   path: string;
// }

// interface DropdownMenuProps {
//   title: string;
//   items: DropdownItem[];
//   isOpen: boolean;
//   isHovering: boolean;
//   onToggle: () => void;
//   onHover: () => void;
//   onLeave: () => void;
//   onContainerLeave: () => void;
//   setIsMenuOpen: (isOpen: boolean) => void;
//   theme: string;
// }

// // Theme context for managing dark/light mode
// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const [theme, setTheme] = useState<string>(() => {
//     // Check localStorage or system preference
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) return savedTheme;
//     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//   });

//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'light' ? 'dark' : 'light');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isHovering, setIsHovering] = useState<string | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setIsMenuOpen(false);
//         setOpenDropdown(null);
//       }
//     };

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('scroll', handleScroll);
//     document.addEventListener('mousedown', handleClickOutside);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setOpenDropdown(null);
//     setIsHovering(null);
//   };

//   const toggleDropdown = (dropdownName: string) => {
//     if (window.innerWidth < 1024) {
//       setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
//     }
//   };

//   const handleDropdownHover = (dropdownName: string) => {
//     if (window.innerWidth >= 1024) {
//       setIsHovering(dropdownName);
//       setOpenDropdown(dropdownName);
//     }
//   };

//   const handleDropdownLeave = () => {
//     if (window.innerWidth >= 1024) {
//       setIsHovering(null);
//       setTimeout(() => {
//         if (!isHovering) {
//           setOpenDropdown(null);
//         }
//       }, 200);
//     }
//   };

//   const handleDropdownLeaveContainer = () => {
//     if (window.innerWidth >= 1024) {
//       setIsHovering(null);
//       setOpenDropdown(null);
//     }
//   };

//   const dropdownItems: Record<string, DropdownItem[]> = {
//     home: [
//       { label: "Overview", path: "/" },
//       { label: "Services", path: "/services" },
//       { label: "Coverage Map", path: "/coverage" },
//       { label: "Testimonials", path: "/testimonials" }
//     ],
//     about: [
//       { label: "Our Story", path: "/our-story" },
//       { label: "Team", path: "/team" },
//       { label: "Careers", path: "/careers" },
//       { label: "Press", path: "/press" }
//     ],
//     features: [
//       { label: "Internet Plans", path: "/plans" },
//       { label: "Speed Test", path: "/speedtest" },
//       { label: "Reliability", path: "/reliability" },
//       { label: "Support", path: "/support" }
//     ]
//   };

//   return (
//     <header className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 z-50 ${
//       isScrolled && !isMenuOpen // Only apply scrolled styles when menu is NOT open
//         ? theme === 'dark'
//           ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700'
//           : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
//         : theme === 'dark'
//           ? 'bg-transparent border-b border-gray-700/30'
//           : 'bg-transparent border-b border-gray-300/30'
//     }`}>
//       <div className="flex flex-wrap items-center gap-4 w-full max-w-6xl mx-auto py-4 px-4 sm:px-10 min-h-[70px] tracking-wide">
//         <Link to="/" className="max-sm:hidden text-2xl font-bold text-green-500">
//           <img 
//             src={logo} 
//             alt="RNM AUTH" 
//             className="h-10 w-auto"
//           />
//         </Link>
//         <Link to="/" className="hidden max-sm:block text-2xl font-bold text-green-500">
//           <img 
//             src={logo} 
//             alt="RNM AUTH" 
//             className="h-10 w-auto"
//           />
//         </Link>

//         <div
//           ref={dropdownRef}
//           className={`lg:!flex lg:flex-auto lg:ml-12 max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 ${
//             isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'
//           }`}
//         >
//           <button
//             onClick={toggleMenu}
//             className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white dark:bg-gray-800 w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-gray-700 cursor-pointer"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-3.5 h-3.5 fill-black dark:fill-white"
//               viewBox="0 0 320.591 320.591"
//             >
//               <path
//                 d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
//                 data-original="#000000"
//               ></path>
//               <path
//                 d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
//                 data-original="#000000"
//               ></path>
//             </svg>
//           </button>

//           {/* Fixed mobile menu container that stays visible when open */}
//           <div className={`lg:!flex lg:flex-auto max-lg:fixed max-lg:bg-white max-lg:dark:bg-gray-900 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
//             isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'
//           }`}>
//             <ul className="lg:flex lg:gap-x-8 max-lg:space-y-2">
//               <li className="mb-6 hidden max-lg:block">
//                 <Link to="/" className='text-2xl font-bold text-green-500'>
//                   <img 
//                     src={logo} 
//                     alt="RNM AUTH" 
//                     className="h-10 w-auto"
//                   />
//                 </Link>
//               </li>
              
//               <DropdownMenu
//                 title="Home"
//                 items={dropdownItems.home}
//                 isOpen={openDropdown === 'home'}
//                 isHovering={isHovering === 'home'}
//                 onToggle={() => toggleDropdown('home')}
//                 onHover={() => handleDropdownHover('home')}
//                 onLeave={handleDropdownLeave}
//                 onContainerLeave={handleDropdownLeaveContainer}
//                 setIsMenuOpen={setIsMenuOpen}
//                 theme={theme}
//               />
              
//               <DropdownMenu
//                 title="About Us"
//                 items={dropdownItems.about}
//                 isOpen={openDropdown === 'about'}
//                 isHovering={isHovering === 'about'}
//                 onToggle={() => toggleDropdown('about')}
//                 onHover={() => handleDropdownHover('about')}
//                 onLeave={handleDropdownLeave}
//                 onContainerLeave={handleDropdownLeaveContainer}
//                 setIsMenuOpen={setIsMenuOpen}
//                 theme={theme}
//               />
              
//               <DropdownMenu
//                 title="Features"
//                 items={dropdownItems.features}
//                 isOpen={openDropdown === 'features'}
//                 isHovering={isHovering === 'features'}
//                 onToggle={() => toggleDropdown('features')}
//                 onHover={() => handleDropdownHover('features')}
//                 onLeave={handleDropdownLeave}
//                 onContainerLeave={handleDropdownLeaveContainer}
//                 setIsMenuOpen={setIsMenuOpen}
//                 theme={theme}
//               />
              
//               <li className="max-lg:border-b max-lg:border-gray-300 max-lg:dark:border-gray-700 max-lg:py-3 mt-2">
//                 <Link to="/contact" className="hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white block font-medium text-[15px]">
//                   Contact
//                 </Link>
//               </li>
//             </ul>

//             <ul className="lg:flex lg:items-center ml-auto max-lg:block lg:space-x-8">
//               <li className="max-lg:border-b max-lg:border-gray-300 max-lg:dark:border-gray-700 max-lg:py-3 max-lg:mt-2">
//                 <Link to="/pricing" className="hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white block font-medium text-[15px]">
//                   Pricing
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-l border-gray-400 dark:border-gray-600 h-6 max-lg:hidden"></div>

//         <div className="flex items-center ml-auto space-x-4">
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 hidden"
//             aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//           >
//             {theme === 'light' ? (
//               <FiMoon className="w-5 h-5 text-gray-700" />
//             ) : (
//               <FiSun className="w-5 h-5 text-yellow-400" />
//             )}
//           </button>

//           <Link to="/login" className="hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white block font-medium text-[15px]">
//             Log in
//           </Link>
//           <Link to="/free-survey" className="px-4 py-2 text-sm rounded-md font-medium text-white border-2 border-[#1d294f] bg-[#1d294f] hover:bg-[#162043] cursor-pointer">
//             GET A FREE SURVEY
//           </Link>

//           <button onClick={toggleMenu} className="lg:hidden cursor-pointer">
//             <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 fillRule="evenodd"
//                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//           </button>
//         </div>
        
//       </div>
//     </header>
//   );
// };

// const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
//   title, 
//   items, 
//   isOpen, 
//   isHovering, 
//   onToggle, 
//   onHover, 
//   onLeave, 
//   onContainerLeave,
//   setIsMenuOpen,
//   // theme 
// }) => {
//   const handleLinkClick = () => {
//     if (setIsMenuOpen && window.innerWidth < 1024) {
//       setIsMenuOpen(false);
//     }
//   };

//   return (
//     <li 
//       className="relative max-lg:border-b max-lg:border-gray-300 max-lg:dark:border-gray-700 max-lg:py-3"
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//     >
//       <button
//         onClick={onToggle}
//         className="flex items-center justify-between gap-2 hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white font-medium text-[15px] w-full lg:w-auto lg:py-2"
//       >
//         {title}
//         <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>
      
//       {(isOpen || isHovering) && (
//         <div 
//           className="lg:absolute lg:top-full lg:left-0 lg:mt-0 lg:bg-white lg:dark:bg-gray-800 lg:shadow-lg lg:rounded-md lg:min-w-[200px] lg:border lg:border-gray-200 lg:dark:border-gray-700 lg:z-10 lg:py-2"
//           onMouseLeave={onContainerLeave}
//         >
//           <ul>
//             {items.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   onClick={handleLinkClick}
//                   className="block px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </li>
//   );
// };

// const Navbar: React.FC = () => {
//   return (
//     <ThemeProvider>
//       <div className="relative">
//         <Header />
//         <div className="pt-[70px]">
//           {/* <AuroraHero /> */}
//         </div>
//       </div>
//     </ThemeProvider>
//   )
// }

// export default Navbar;



import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { Link } from 'react-router-dom';
import { FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
// import { motion } from "framer-motion";

import logo from "../assets/img/logo.png";

// Define types for theme context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface DropdownItem {
  label: string;
  path: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  isOpen: boolean;
  isHovering: boolean;
  onToggle: () => void;
  onHover: () => void;
  onLeave: () => void;
  onContainerLeave: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  theme: string;
}

// Theme context for managing dark/light mode
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
    setIsHovering(null);
  };

  const toggleDropdown = (dropdownName: string) => {
    if (window.innerWidth < 1024) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleDropdownHover = (dropdownName: string) => {
    if (window.innerWidth >= 1024) {
      setIsHovering(dropdownName);
      setOpenDropdown(dropdownName);
    }
  };

  const handleDropdownLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsHovering(null);
      setTimeout(() => {
        if (!isHovering) {
          setOpenDropdown(null);
        }
      }, 200);
    }
  };

  const handleDropdownLeaveContainer = () => {
    if (window.innerWidth >= 1024) {
      setIsHovering(null);
      setOpenDropdown(null);
    }
  };

  const dropdownItems: Record<string, DropdownItem[]> = {
    home: [
      { label: "Overview", path: "/" },
      { label: "Services", path: "/services" },
      { label: "Coverage Map", path: "/coverage" },
      { label: "Testimonials", path: "/testimonials" }
    ],
    about: [
      { label: "Our Story", path: "/our-story" },
      { label: "Team", path: "/team" },
      { label: "Careers", path: "/careers" },
      { label: "Press", path: "/press" }
    ],
    features: [
      { label: "Internet Plans", path: "/plans" },
      { label: "Speed Test", path: "/speedtest" },
      { label: "Reliability", path: "/reliability" },
      { label: "Support", path: "/support" }
    ]
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 z-50 ${
      isScrolled && !isMenuOpen // Only apply scrolled styles when menu is NOT open
        ? theme === 'dark'
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700'
          : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
        : theme === 'dark'
          ? 'bg-transparent border-b border-gray-700/30'
          : 'bg-transparent border-b border-gray-300/30'
    }`}>
      <div className="flex flex-wrap items-center gap-4 w-full max-w-6xl mx-auto py-4 px-4 sm:px-10 min-h-[70px] tracking-wide">
        <Link to="/" className="max-sm:hidden text-2xl font-bold text-green-500">
          <img 
            src={logo} 
            alt="RNM AUTH" 
            className="h-10 w-auto"
          />
        </Link>
        <Link to="/" className="hidden max-sm:block text-2xl font-bold text-green-500">
          <img 
            src={logo} 
            alt="RNM AUTH" 
            className="h-10 w-auto"
          />
        </Link>

        <div
          ref={dropdownRef}
          className={`lg:!flex lg:flex-auto lg:ml-12 max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 ${
            isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'
          }`}
        >
          <button
            onClick={toggleMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white dark:bg-gray-800 w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black dark:fill-white"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          {/* Fixed mobile menu container that stays visible when open */}
          <div className={`lg:!flex lg:flex-auto max-lg:fixed max-lg:bg-white max-lg:dark:bg-gray-900 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
            isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'
          }`}>
            <ul className="lg:flex lg:gap-x-8 max-lg:space-y-2">
              <li className="mb-6 hidden max-lg:block">
                <Link to="/" className='text-2xl font-bold text-green-500'>
                  <img 
                    src={logo} 
                    alt="RNM AUTH" 
                    className="h-10 w-auto"
                  />
                </Link>
              </li>
              
              <DropdownMenu
                title="Home"
                items={dropdownItems.home}
                isOpen={openDropdown === 'home'}
                isHovering={isHovering === 'home'}
                onToggle={() => toggleDropdown('home')}
                onHover={() => handleDropdownHover('home')}
                onLeave={handleDropdownLeave}
                onContainerLeave={handleDropdownLeaveContainer}
                setIsMenuOpen={setIsMenuOpen}
                theme={theme}
              />
              
              <DropdownMenu
                title="About Us"
                items={dropdownItems.about}
                isOpen={openDropdown === 'about'}
                isHovering={isHovering === 'about'}
                onToggle={() => toggleDropdown('about')}
                onHover={() => handleDropdownHover('about')}
                onLeave={handleDropdownLeave}
                onContainerLeave={handleDropdownLeaveContainer}
                setIsMenuOpen={setIsMenuOpen}
                theme={theme}
              />
              
              <DropdownMenu
                title="Features"
                items={dropdownItems.features}
                isOpen={openDropdown === 'features'}
                isHovering={isHovering === 'features'}
                onToggle={() => toggleDropdown('features')}
                onHover={() => handleDropdownHover('features')}
                onLeave={handleDropdownLeave}
                onContainerLeave={handleDropdownLeaveContainer}
                setIsMenuOpen={setIsMenuOpen}
                theme={theme}
              />
              
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:dark:border-gray-700 max-lg:py-3 mt-2">
                <Link to="/contact" className="hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white block font-medium text-[15px]">
                  Contact
                </Link>
              </li>
            </ul>

            <ul className="lg:flex lg:items-center ml-auto max-lg:block lg:space-x-8">
              <li className="max-lg:border-b max-lg:border-gray-300 max-lg:dark:border-gray-700 max-lg:py-3 max-lg:mt-2">
                <Link to="/pricing" className="hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white block font-medium text-[15px]">
                  Pricing
                </Link>
              </li>
            </ul>

            {/* Mobile-only buttons in sidebar */}
            <div className="lg:hidden mt-8 space-y-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-3" />
                ) : (
                  <FiSun className="w-5 h-5 text-yellow-400 mr-3" />
                )}
                <span className="text-slate-900 dark:text-white font-medium text-[15px]">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </button>

              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full p-3 hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white font-medium text-[15px]"
              >
                Log in
              </Link>
              
              <Link 
                to="/free-survey" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 text-sm rounded-md font-medium text-white border-2 border-[#1d294f] bg-[#1d294f] hover:bg-[#162043] cursor-pointer"
              >
                GET A FREE SURVEY
              </Link>
            </div>
          </div>
        </div>

        <div className="border-l border-gray-400 dark:border-gray-600 h-6 max-lg:hidden"></div>

        <div className="flex items-center ml-auto space-x-4">
          {/* Theme Toggle Button - Hidden on mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 max-lg:hidden"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <FiMoon className="w-5 h-5 text-gray-700" />
            ) : (
              <FiSun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          {/* Login and Free Survey buttons - Hidden on mobile */}
          <Link to="/login" className="hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white block font-medium text-[15px] max-lg:hidden">
            Log in
          </Link>
          <Link to="/free-survey" className="px-4 py-2 text-sm rounded-md font-medium text-white border-2 border-[#1d294f] bg-[#1d294f] hover:bg-[#162043] cursor-pointer max-lg:hidden">
            GET A FREE SURVEY
          </Link>

          <button onClick={toggleMenu} className="lg:hidden cursor-pointer">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        
      </div>
    </header>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  title, 
  items, 
  isOpen, 
  isHovering, 
  onToggle, 
  onHover, 
  onLeave, 
  onContainerLeave,
  setIsMenuOpen,
  // theme 
}) => {
  const handleLinkClick = () => {
    if (setIsMenuOpen && window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
  };

  return (
    <li 
      className="relative max-lg:border-b max-lg:border-gray-300 max-lg:dark:border-gray-700 max-lg:py-3"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-2 hover:text-blue-700 dark:hover:text-blue-400 text-slate-900 dark:text-white font-medium text-[15px] w-full lg:w-auto lg:py-2"
      >
        {title}
        <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {(isOpen || isHovering) && (
        <div 
          className="lg:absolute lg:top-full lg:left-0 lg:mt-0 lg:bg-white lg:dark:bg-gray-800 lg:shadow-lg lg:rounded-md lg:min-w-[200px] lg:border lg:border-gray-200 lg:dark:border-gray-700 lg:z-10 lg:py-2"
          onMouseLeave={onContainerLeave}
        >
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const Navbar: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative">
        <Header />
        <div className="pt-[70px]">
          {/* <AuroraHero /> */}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Navbar;
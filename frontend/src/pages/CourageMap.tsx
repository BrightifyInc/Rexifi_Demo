import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiSearch, FiWifi, FiUsers, FiZap, FiChevronDown, FiPlay, FiCheck, FiX, FiNavigation, FiClock } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';


const CoverageMap = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('map');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const mapRef = useRef(null);

  // Sample coverage data
  const coverageAreas = [
    {
      id: 1,
      name: "Central Business District",
      type: "fiber",
      coverage: "98%",
      speed: "1Gbps",
      status: "excellent",
      coordinates: { x: 35, y: 45 },
      population: "50K+",
      lastUpdate: "2 hours ago",
      technologies: ["Fiber", "5G", "WiFi-6"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"
    },
    {
      id: 2,
      name: "Residential North",
      type: "wireless",
      coverage: "95%",
      speed: "100Mbps",
      status: "good",
      coordinates: { x: 60, y: 30 },
      population: "25K+",
      lastUpdate: "4 hours ago",
      technologies: ["Wireless", "4G", "WiFi-5"],
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400"
    },
    {
      id: 3,
      name: "Industrial Zone",
      type: "enterprise",
      coverage: "99%",
      speed: "10Gbps",
      status: "excellent",
      coordinates: { x: 25, y: 70 },
      population: "5K+",
      lastUpdate: "1 hour ago",
      technologies: ["Fiber", "Dedicated", "WiFi-6E"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
    },
    {
      id: 4,
      name: "Suburban South",
      type: "mixed",
      coverage: "85%",
      speed: "50Mbps",
      status: "moderate",
      coordinates: { x: 70, y: 65 },
      population: "15K+",
      lastUpdate: "6 hours ago",
      technologies: ["Wireless", "4G"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
    },
    {
      id: 5,
      name: "University District",
      type: "fiber",
      coverage: "99%",
      speed: "2.5Gbps",
      status: "excellent",
      coordinates: { x: 45, y: 25 },
      population: "40K+",
      lastUpdate: "30 minutes ago",
      technologies: ["Fiber", "5G", "WiFi-6"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"
    }
  ];

  const technologyTypes = {
    fiber: { color: 'blue', label: 'Fiber Optic', icon: <FiZap /> },
    wireless: { color: 'green', label: 'Wireless', icon: <FiWifi /> },
    enterprise: { color: 'purple', label: 'Enterprise', icon: <FiUsers /> },
    mixed: { color: 'orange', label: 'Mixed', icon: <FiNavigation /> }
  };

  const statusColors = {
    excellent: 'from-green-500 to-emerald-400',
    good: 'from-blue-500 to-cyan-400',
    moderate: 'from-yellow-500 to-amber-400',
    poor: 'from-red-500 to-pink-400'
  };

  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      hover: "hover:border-blue-400",
      gradient: "from-blue-500/20 to-blue-600/10",
      solid: "bg-blue-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
      hover: "hover:border-purple-400",
      gradient: "from-purple-500/20 to-purple-600/10",
      solid: "bg-purple-500"
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      hover: "hover:border-green-400",
      gradient: "from-green-500/20 to-green-600/10",
      solid: "bg-green-500"
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
      hover: "hover:border-orange-400",
      gradient: "from-orange-500/20 to-orange-600/10",
      solid: "bg-orange-500"
    }
  };

  const filteredAreas = coverageAreas.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || area.status === activeTab;
    const matchesTech = selectedTechnology === 'all' || area.type === selectedTechnology;
    return matchesSearch && matchesTab && matchesTech;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const mapPinVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.2, y: -5 },
    tap: { scale: 0.9 }
  };

  return (

    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-950">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              <motion.span
                variants={itemVariants}
                className="inline-block rounded-full bg-gray-800/50 px-6 py-3 text-sm text-gray-300 mb-6 border border-gray-700/50"
              >
                📡 NETWORK COVERAGE MAP
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Explore Our
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Coverage </span>
                Network
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Discover the extensive reach of Rexifi's high-speed internet services. 
                Check availability in your area and experience seamless connectivity like never before.
              </motion.p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
            >
              {[
                { number: "50+", label: "Cities Covered", color: "blue" },
                { number: "98%", label: "Network Uptime", color: "green" },
                { number: "1M+", label: "Users Served", color: "purple" },
                { number: "24/7", label: "Support", color: "orange" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                >
                  <div className={`text-3xl font-bold ${colorMap[stat.color].text} mb-2`}>{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Controls Bar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-700/50"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search your area..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                  {['all', 'excellent', 'good', 'moderate'].map((tab) => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </div>

                {/* Technology Filter */}
                <div className="flex gap-2">
                  <select
                    value={selectedTechnology}
                    onChange={(e) => setSelectedTechnology(e.target.value)}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl text-white px-4 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Technologies</option>
                    {Object.entries(technologyTypes).map(([key, tech]) => (
                      <option key={key} value={key}>{tech.label}</option>
                    ))}
                  </select>

                  {/* View Toggle */}
                  <div className="flex bg-gray-800/50 rounded-xl p-1">
                    {['map', 'list'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          viewMode === mode
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map/List Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map Container */}
              <motion.div
                layout
                className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700/50 relative overflow-hidden"
              >
                {/* Interactive Map Background */}
                <div 
                  ref={mapRef}
                  className="relative w-full h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-gray-600/30"
                >
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Map Pins */}
                  {filteredAreas.map((area) => {
                    const tech = technologyTypes[area.type];
                    return (
                      <motion.button
                        key={area.id}
                        variants={mapPinVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setSelectedArea(area)}
                        className={`absolute w-8 h-8 rounded-full border-4 ${
                          selectedArea?.id === area.id 
                            ? `${colorMap[tech.color].solid} scale-125` 
                            : `${colorMap[tech.color].border} ${colorMap[tech.color].bg}`
                        } transition-all duration-300 flex items-center justify-center`}
                        style={{
                          left: `${area.coordinates.x}%`,
                          top: `${area.coordinates.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className={colorMap[tech.color].text}>
                          {tech.icon}
                        </div>
                        
                        {/* Pulse Animation */}
                        {area.status === 'excellent' && (
                          <motion.div
                            className={`absolute inset-0 rounded-full ${colorMap[tech.color].bg}`}
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    );
                  })}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
                    <h4 className="text-white font-semibold mb-2">Legend</h4>
                    <div className="space-y-2">
                      {Object.entries(technologyTypes).map(([key, tech]) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${colorMap[tech.color].solid}`} />
                          <span className="text-gray-300">{tech.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coverage Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {['excellent', 'good', 'moderate', 'poor'].map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${statusColors[status]}`} />
                      <span className="text-gray-300 text-sm capitalize">{status}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Sidebar - Area Details */}
              <motion.div
                layout
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {selectedArea ? 'Area Details' : 'Select an Area'}
                </h3>

                <AnimatePresence mode="wait">
                  {selectedArea ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden">
                        <img 
                          src={selectedArea.image} 
                          alt={selectedArea.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h4 className="text-white font-bold text-lg">{selectedArea.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            colorMap[technologyTypes[selectedArea.type].color].solid
                          } text-white`}>
                            {technologyTypes[selectedArea.type].label}
                          </span>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400">{selectedArea.coverage}</div>
                          <div className="text-gray-400 text-xs">Coverage</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-green-400">{selectedArea.speed}</div>
                          <div className="text-gray-400 text-xs">Max Speed</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400">{selectedArea.population}</div>
                          <div className="text-gray-400 text-xs">Population</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400">
                            <FiClock className="inline w-4 h-4 mr-1" />
                            {selectedArea.lastUpdate}
                          </div>
                          <div className="text-gray-400 text-xs">Last Update</div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="text-white font-semibold mb-2">Available Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedArea.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">Service Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedArea.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                          selectedArea.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {selectedArea.status.charAt(0).toUpperCase() + selectedArea.status.slice(1)}
                        </span>
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        Check Availability
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 text-gray-400"
                    >
                      <FiMapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click on a location pin to view detailed coverage information</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expansion Plans Section */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Future <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Expansion</span> Plans
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We're constantly expanding our network to bring high-speed internet to more communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { area: "Rural East Zone", timeline: "Q2 2024", tech: "Wireless", color: "green" },
                { area: "Coastal Region", timeline: "Q3 2024", tech: "Fiber", color: "blue" },
                { area: "Mountain Communities", timeline: "Q4 2024", tech: "Mixed", color: "orange" }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50"
                >
                  <div className={`w-12 h-12 rounded-xl ${colorMap[plan.color].bg} flex items-center justify-center mb-4`}>
                    <div className={colorMap[plan.color].text}>
                      <FiNavigation className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.area}</h3>
                  <p className="text-gray-400 mb-4">Coming {plan.timeline}</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${colorMap[plan.color].solid} text-white`}>
                    {plan.tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <RexifiFooter />
      
    </>

  );
};

export default CoverageMap;
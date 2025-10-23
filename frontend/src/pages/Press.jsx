import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiExternalLink, FiCalendar, FiUser, FiBook, FiVideo, FiAward, FiTrendingUp, FiShare2, FiDownload, FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

const PressPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const categories = [
    { id: 'all', label: 'All Press', count: 42, color: 'blue' },
    { id: 'news', label: 'News Coverage', count: 18, color: 'green' },
    { id: 'awards', label: 'Awards', count: 8, color: 'orange' },
    { id: 'interviews', label: 'Interviews', count: 12, color: 'purple' },
    { id: 'releases', label: 'Press Releases', count: 4, color: 'blue' }
  ];

  const featuredPress = [
    {
      id: 1,
      title: "Rexifi Revolutionizes African Internet Connectivity with 5G Expansion",
      outlet: "TechCrunch Africa",
      type: "news",
      date: "2024-01-15",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      excerpt: "Rexifi's ambitious 5G rollout across West Africa sets new standards for internet accessibility and speed, connecting millions to high-speed broadband.",
      readTime: "4 min read",
      featured: true,
      highlights: ["5G Expansion", "West Africa", "Digital Inclusion"],
      link: "https://techcrunch.com/africa/rexifi-5g-expansion"
    },
    {
      id: 2,
      title: "Innovation Award 2024: Rexifi Wins Top Honors for Rural Connectivity Solution",
      outlet: "Forbes Africa",
      type: "awards",
      date: "2024-01-10",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      excerpt: "Recognized for groundbreaking work in bringing affordable internet to remote communities, Rexifi receives the prestigious Innovation Award 2024.",
      readTime: "3 min read",
      featured: true,
      highlights: ["Innovation Award", "Rural Connectivity", "Industry Recognition"],
      link: "https://forbes.com/africa/innovation-awards-2024"
    },
    {
      id: 3,
      title: "CEO Interview: The Future of Internet in Emerging Markets",
      outlet: "Bloomberg Technology",
      type: "interviews",
      date: "2024-01-08",
      author: "David Rodriguez",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600",
      excerpt: "Exclusive interview with Rexifi CEO discussing the company's vision for bridging the digital divide and upcoming expansion plans.",
      readTime: "6 min read",
      featured: true,
      highlights: ["CEO Interview", "Emerging Markets", "Future Vision"],
      link: "https://bloomberg.com/technology/rexifi-ceo-interview"
    }
  ];

  const pressArticles = [
    {
      id: 4,
      title: "Rexifi Partners with Local Governments to Expand Fiber Network",
      outlet: "Business Daily Africa",
      type: "news",
      date: "2024-01-05",
      author: "Amina Bello",
      excerpt: "Strategic partnerships accelerate fiber optic deployment across urban centers, promising gigabit speeds for businesses and homes.",
      readTime: "3 min read",
      logo: "📰",
      link: "#"
    },
    {
      id: 5,
      title: "Best Internet Service Provider 2023 - Customer Choice Award",
      outlet: "Consumer Reports Africa",
      type: "awards",
      date: "2023-12-20",
      author: "Consumer Choice Committee",
      excerpt: "Voted best ISP by customers for reliability, speed, and customer service excellence across multiple African nations.",
      readTime: "2 min read",
      logo: "🏆",
      link: "#"
    },
    {
      id: 6,
      title: "Press Release: Rexifi Announces Free Community Internet Initiative",
      outlet: "Rexifi Communications",
      type: "releases",
      date: "2023-12-15",
      author: "Press Office",
      excerpt: "New initiative to provide free internet access to underserved communities, supporting education and economic development.",
      readTime: "5 min read",
      logo: "📢",
      link: "#"
    },
    {
      id: 7,
      title: "CTO Roundtable: Building Africa's Digital Infrastructure",
      outlet: "Wired Magazine",
      type: "interviews",
      date: "2023-12-10",
      author: "Tech Insights Team",
      excerpt: "Rexifi CTO joins industry leaders to discuss the challenges and opportunities in building Africa's digital future.",
      readTime: "4 min read",
      logo: "🎙️",
      link: "#"
    },
    {
      id: 8,
      title: "Rexifi's Green Initiative: Solar-Powered Internet Towers",
      outlet: "Green Tech Review",
      type: "news",
      date: "2023-12-01",
      author: "Eco Tech Team",
      excerpt: "Innovative solar-powered infrastructure reduces carbon footprint while expanding network coverage to remote areas.",
      readTime: "3 min read",
      logo: "🌱",
      link: "#"
    },
    {
      id: 9,
      title: "Excellence in Customer Service Award 2023",
      outlet: "Service Quality Institute",
      type: "awards",
      date: "2023-11-25",
      author: "Awards Committee",
      excerpt: "Recognized for outstanding 24/7 customer support and rapid issue resolution across all service areas.",
      readTime: "2 min read",
      logo: "⭐",
      link: "#"
    }
  ];

  const mediaKit = {
    logoPack: [
      { name: "Primary Logo", format: "SVG", size: "2.1 MB" },
      { name: "Brand Guidelines", format: "PDF", size: "5.4 MB" },
      { name: "Press Photos", format: "ZIP", size: "15.2 MB" }
    ],
    contacts: [
      { name: "Sarah Johnson", role: "Head of Communications", email: "press@rexifi.com" },
      { name: "Michael Chen", role: "Media Relations", email: "media@rexifi.com" }
    ]
  };

  const stats = [
    { number: "500+", label: "Media Mentions", icon: <FiBook className="w-6 h-6" />, color: "blue" },
    { number: "25+", label: "Industry Awards", icon: <FiAward className="w-6 h-6" />, color: "orange" },
    { number: "15+", label: "Countries Covered", icon: <FiTrendingUp className="w-6 h-6" />, color: "green" },
    { number: "2M+", label: "Social Reach", icon: <FiShare2 className="w-6 h-6" />, color: "purple" }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? pressArticles 
    : pressArticles.filter(article => article.type === activeCategory);

  const filteredFeatured = activeCategory === 'all' 
    ? featuredPress 
    : featuredPress.filter(article => article.type === activeCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredFeatured.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredFeatured.length) % filteredFeatured.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoplay || filteredFeatured.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, filteredFeatured.length]);

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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              📰 PRESS & MEDIA
              </motion.span>
              
              <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
              Rexifi in the
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">News</span>
              </motion.h1>
              
              <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
              Latest news coverage, awards, and announcements about Rexifi's mission to 
              revolutionize internet connectivity across Africa.
              </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
          >
              {stats.map((stat, index) => (
              <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[stat.color].bg} mb-3`}>
                  <div className={colorMap[stat.color].text}>
                      {stat.icon}
                  </div>
                  </div>
                  <div className={`text-2xl md:text-3xl font-bold ${colorMap[stat.color].text} mb-1`}>{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
              ))}
          </motion.div>
          </div>
      </section>

      {/* Featured Press Slider */}
      {filteredFeatured.length > 0 && (
          <section className="py-16">
          <div className="container mx-auto px-4">
              <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
              >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Featured</span> Coverage
              </motion.h2>
              </motion.div>

              {/* Slider Container */}
              <div className="relative max-w-6xl mx-auto">
              {/* Slider Controls */}
              <div className="flex justify-center items-center gap-4 mb-8">
                  <button
                  onClick={() => setAutoplay(!autoplay)}
                  className="p-3 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
                  >
                  {autoplay ? <FiPause className="w-5 h-5" /> : <FiPlay className="w-5 h-5" />}
                  </button>
                  
                  <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
                  >
                  <FiChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="flex gap-2">
                  {filteredFeatured.map((_, index) => (
                      <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                          index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                      />
                  ))}
                  </div>

                  <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
                  >
                  <FiChevronRight className="w-6 h-6" />
                  </button>
              </div>

              {/* Slider */}
              <div className="relative h-96 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700/50">
                  <AnimatePresence mode="wait">
                  {filteredFeatured.map((article, index) => (
                      index === currentSlide && (
                      <motion.div
                          key={article.id}
                          initial={{ opacity: 0, x: 300 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -300 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                      >
                          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                          {/* Image Section */}
                          <div className="relative h-48 lg:h-full">
                              <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:bg-gradient-to-l" />
                              <div className="absolute bottom-4 left-4 lg:bottom-auto lg:top-4 lg:left-auto lg:right-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorMap[article.type === 'news' ? 'green' : article.type === 'awards' ? 'orange' : 'purple'].solid} text-white`}>
                                  {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                              </span>
                              </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-8 flex flex-col justify-center">
                              <div className="mb-4">
                              <span className="text-blue-400 font-semibold">{article.outlet}</span>
                              <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                                  <div className="flex items-center gap-1">
                                  <FiCalendar className="w-4 h-4" />
                                  {formatDate(article.date)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                  <FiUser className="w-4 h-4" />
                                  {article.author}
                                  </div>
                                  <span>{article.readTime}</span>
                              </div>
                              </div>

                              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                              {article.title}
                              </h3>

                              <p className="text-gray-300 mb-6 leading-relaxed">
                              {article.excerpt}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-6">
                              {article.highlights.map((highlight, idx) => (
                                  <span
                                  key={idx}
                                  className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                                  >
                                  {highlight}
                                  </span>
                              ))}
                              </div>

                              <div className="flex gap-4">
                              <a
                                  href={article.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                              >
                                  Read Full Article
                                  <FiExternalLink className="w-4 h-4" />
                              </a>
                              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                  <FiShare2 className="w-4 h-4" />
                                  Share
                              </button>
                              </div>
                          </div>
                          </div>
                      </motion.div>
                      )
                  ))}
                  </AnimatePresence>
              </div>
              </div>
          </div>
          </section>
      )}

      {/* Press Articles Grid */}
      <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
              {/* Header with Search and Filter */}
              <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12"
              >
              <div>
                  <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Latest <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Press</span>
                  </motion.h2>
                  <motion.p variants={itemVariants} className="text-xl text-gray-400">
                  News articles, awards, and announcements from around the world
                  </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  {/* Search */}
                  <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                      type="text"
                      placeholder="Search press..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-full lg:w-64"
                  />
                  </div>
              </div>
              </motion.div>

              {/* Category Filter */}
              <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-4 mb-8"
              >
              {categories.map((category) => (
                  <motion.button
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category.id
                      ? `${colorMap[category.color].solid} text-white shadow-lg`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  >
                  {category.label}
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {category.count}
                  </span>
                  </motion.button>
              ))}
              </motion.div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                  <motion.article
                  key={article.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                  >
                  <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                      <div className="text-2xl">{article.logo}</div>
                      <div>
                          <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                          {article.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{article.outlet}</p>
                      </div>
                      </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {formatDate(article.date)}
                      </div>
                      <span>{article.readTime}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">By {article.author}</span>
                      <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  </motion.article>
              ))}
              </div>
          </div>
          </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-16">
          <div className="container mx-auto px-4">
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
          >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Media <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Resources</span>
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Download Assets */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-6">Media Assets</h3>
                  <div className="space-y-4">
                  {mediaKit.logoPack.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-gray-700/50">
                      <div>
                          <div className="font-semibold text-white">{asset.name}</div>
                          <div className="text-sm text-gray-400">{asset.format} • {asset.size}</div>
                      </div>
                      <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                          <FiDownload className="w-4 h-4" />
                          Download
                      </button>
                      </div>
                  ))}
                  </div>
              </motion.div>

              {/* Press Contacts */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-6">Press Contacts</h3>
                  <div className="space-y-4">
                  {mediaKit.contacts.map((contact, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-xl border border-gray-700/50">
                      <div className="font-semibold text-white">{contact.name}</div>
                      <div className="text-sm text-gray-400 mb-2">{contact.role}</div>
                      <a href={`mailto:${contact.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                          {contact.email}
                      </a>
                      </div>
                  ))}
                  </div>
              </motion.div>
              </div>
          </motion.div>
          </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
          {selectedArticle && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
          >
              <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-500/20"
              onClick={(e) => e.stopPropagation()}
              >
              <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                  <div>
                      <span className="text-blue-400 font-semibold">{selectedArticle.outlet}</span>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {formatDate(selectedArticle.date)}
                      </div>
                      <div className="flex items-center gap-1">
                          <FiUser className="w-4 h-4" />
                          {selectedArticle.author}
                      </div>
                      <span>{selectedArticle.readTime}</span>
                      </div>
                  </div>
                  <button
                      onClick={() => setSelectedArticle(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                      ✕
                  </button>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-6">
                  {selectedArticle.title}
                  </h2>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                  </p>
                  
                  <div className="flex gap-4">
                  <a
                      href={selectedArticle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                      Read Full Article
                      <FiExternalLink className="w-4 h-4" />
                  </a>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors border border-gray-600 px-6 py-3 rounded-xl">
                      <FiShare2 className="w-4 h-4" />
                      Share
                  </button>
                  </div>
              </div>
              </motion.div>
          </motion.div>
          )}
      </AnimatePresence>
      </div>

      <RexifiFooter />

    </>

  );
};

export default PressPage;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiWifi, FiShield, FiArrowRight, FiCheck, FiPlay, FiStar, FiGlobe, FiClock, FiUsers } from 'react-icons/fi';

const BenefitsSection = () => {
  const [activeBenefit, setActiveBenefit] = useState(0);

  const benefits = [
    {
      id: 1,
      title: "Lightning-Fast Fiber & Wireless Broadband",
      description: "Experience blazing-fast internet speeds with our advanced fiber optic and wireless technologies. Stream, game, and work without interruptions or buffering.",
      features: ["Symmetrical gigabit speeds", "Ultra-low latency", "4K/8K streaming ready", "Lag-free online gaming"],
      icon: <FiZap className="w-8 h-8" />,
      color: "blue",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500",
      stats: { speed: "1Gbps Max", latency: "<10ms", uptime: "99.9%" }
    },
    {
      id: 2,
      title: "Reliable Connectivity Across Africa",
      description: "Stay connected with our robust network infrastructure that delivers consistent performance across urban and rural areas throughout Africa.",
      features: ["99.9% network uptime", "Multiple redundancy", "24/7 network monitoring", "Quick fault resolution"],
      icon: <FiWifi className="w-8 h-8" />,
      color: "purple",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      stats: { coverage: "50+ Cities", reliability: "99.9%", support: "24/7" }
    },
    {
      id: 3,
      title: "Enterprise-Grade Security & Privacy",
      description: "Protect your data with military-grade encryption and advanced security features. Your online activities remain private and secure with Rexifi.",
      features: ["Bank-level encryption", "DDoS protection", "Secure browsing", "Privacy-first approach"],
      icon: <FiShield className="w-8 h-8" />,
      color: "orange",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500",
      stats: { security: "Military-grade", privacy: "Guaranteed", threats: "Blocked" }
    }
  ];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 }
  };

  const currentBenefit = benefits[activeBenefit];

  return (
    <section className="relative bg-gray-900 py-14 md:py-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wrapper mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-2xl mx-auto mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="max-w-lg mx-auto mb-3 font-bold text-center text-white text-3xl md:text-5xl"
          >
            Why Choose Rexifi Internet?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base font-normal leading-6 text-white/50 text-lg"
          >
            Experience the future of connectivity with Africa's most reliable and advanced internet service provider. 
            Built for speed, reliability, and security.
          </motion.p>
        </motion.div>

        <div className="max-w-[1200px] mx-auto">
          {/* Benefits Navigation */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {benefits.map((benefit, index) => (
              <motion.button
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveBenefit(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  activeBenefit === index
                    ? `${colorMap[benefit.color].solid} text-white shadow-2xl`
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className={activeBenefit === index ? 'text-white' : colorMap[benefit.color].text}>
                  {benefit.icon}
                </div>
                {benefit.title.split(' ').slice(0, 2).join(' ')}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Benefits Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Active Benefit Showcase */}
            <motion.div
              layout
              className="lg:col-span-7"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBenefit.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col justify-between rounded-3xl p-8 md:p-12 h-full border-2 ${colorMap[currentBenefit.color].border}`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colorMap[currentBenefit.color].gradient} opacity-50`}></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute left-8 top-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"
                    />
                    <motion.div
                      animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                      className="absolute right-12 top-1/2 w-12 h-12 bg-white/10 rounded-full blur-lg"
                    />
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 8, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                      className="absolute left-1/2 bottom-8 w-20 h-20 bg-white/10 rounded-full blur-xl"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="max-w-md mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-2xl ${colorMap[currentBenefit.color].bg}`}>
                          <div className={colorMap[currentBenefit.color].text}>
                            {currentBenefit.icon}
                          </div>
                        </div>
                        <h3 className="font-bold text-white text-2xl md:text-4xl">
                          {currentBenefit.title}
                        </h3>
                      </div>
                      <p className="text-lg text-white/70 leading-relaxed">
                        {currentBenefit.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {currentBenefit.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-white/80"
                        >
                          <FiCheck className={`w-5 h-5 ${colorMap[currentBenefit.color].text}`} />
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {Object.entries(currentBenefit.stats).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm"
                        >
                          <div className="text-lg font-bold text-white mb-1">{value}</div>
                          <div className="text-xs text-white/60 capitalize">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative z-10 w-full md:w-auto ${colorMap[currentBenefit.color].solid} text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-3`}
                  >
                    <FiPlay className="w-5 h-5" />
                    Experience {currentBenefit.title.split(' ')[0]} Speed
                    <FiArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Column - Benefits Overview */}
            <motion.div
              variants={containerVariants}
              className="lg:col-span-5"
            >
              <div className="space-y-6 h-full">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => setActiveBenefit(index)}
                    className={`group p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 cursor-pointer transition-all duration-300 ${
                      activeBenefit === index 
                        ? `${colorMap[benefit.color].border} shadow-2xl scale-105` 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${colorMap[benefit.color].bg} group-hover:scale-110 transition-transform duration-300`}>
                        <div className={colorMap[benefit.color].text}>
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {benefit.description.split('.').slice(0, 2).join('.')}...
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-white/40 text-sm">4.9/5</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Full Width Bottom CTA */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-12"
            >
              <div className="relative bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-8 md:p-12 overflow-hidden border-2 border-green-500/20">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full filter blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
                </div>

                <div className="relative z-10 lg:flex lg:items-center lg:justify-between">
                  <div className="max-w-md mb-8 lg:mb-0">
                    <h3 className="font-bold text-white text-2xl md:text-4xl mb-4">
                      Ready to Experience Premium Internet?
                    </h3>
                    <p className="text-white/70 text-lg mb-6">
                      Join 50,000+ satisfied customers across Africa enjoying reliable, high-speed internet.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                    >
                      <FiZap className="w-5 h-5" />
                      Get Rexifi Today
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <div className="flex gap-6 text-center">
                    {[
                      { number: "50K+", label: "Happy Customers", icon: <FiUsers /> },
                      { number: "99.9%", label: "Uptime", icon: <FiClock /> },
                      { number: "50+", label: "Cities", icon: <FiGlobe /> }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="text-white"
                      >
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="text-orange-400">
                            {stat.icon}
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-orange-400">{stat.number}</div>
                        </div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
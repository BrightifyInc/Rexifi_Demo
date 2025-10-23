import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

const RexifiStory = () => {
  const [activeSection, setActiveSection] = useState(0);

  const storySections = [
    {
      title: "The Beginning of Digital Revolution",
      year: "2015",
      content: "Rexifi was born from a vision to bridge the digital divide in underserved communities. Our founders recognized the growing need for reliable, high-speed internet access and set out to create a service that would transform how people connect, work, and live.",
      icon: "🚀",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
      stats: ["10+ Cities", "50K+ Users", "99.1% Uptime"]
    },
    {
      title: "Expansion and Innovation Era",
      year: "2017",
      content: "We successfully expanded our fiber network across multiple states, connecting over 100,000 customers. This period marked our commitment to quality service and technological innovation, establishing Rexifi as a trusted name in internet services.",
      icon: "⭐",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      stats: ["25+ Cities", "100K+ Users", "99.3% Uptime"]
    },
    {
      title: "Cutting-Edge Technology Integration",
      year: "2019",
      content: "Rexifi launched groundbreaking 5G services and smart home solutions, positioning ourselves as industry leaders in customer satisfaction and network reliability. Our AI-powered network optimization set new standards in the industry.",
      icon: "💡",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      stats: ["40+ Cities", "500K+ Users", "99.5% Uptime"]
    },
    {
      title: "Leading the Future of Connectivity",
      year: "2024",
      content: "Today, Rexifi serves over 1 million customers nationwide with gigabit speeds and advanced AI-powered network optimization. We continue to push boundaries in internet technology, ensuring our customers always stay connected to what matters most.",
      icon: "🌐",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      stats: ["50+ Cities", "1M+ Users", "99.9% Uptime"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>

        <Navbar />

        <section className="bg-gray-900 py-14 md:py-28">
        <div className="wrapper max-w-7xl mx-auto px-4">
            {/* Header Section */}
            <motion.div 
            className="max-w-2xl mx-auto mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            >
            <motion.h2
                className="max-w-lg mx-auto mb-3 font-bold text-center text-white text-3xl md:text-5xl"
                variants={itemVariants}
            >
                Our Journey of Digital Transformation
            </motion.h2>
            <motion.p
                className="max-w-2xl mx-auto text-base font-normal leading-6 text-white/50"
                variants={itemVariants}
            >
                From humble beginnings to industry leadership, discover how Rexifi has been 
                connecting lives and powering progress through innovative internet solutions 
                that transform communities and businesses.
            </motion.p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left Column - Timeline Navigation */}
                <motion.div 
                className="lg:col-span-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                >
                <div className="bg-gray-800/50 rounded-2xl p-8 h-full">
                    <h3 className="font-bold text-white text-2xl mb-6">Our Timeline</h3>
                    <div className="space-y-4">
                    {storySections.map((section, index) => (
                        <motion.button
                        key={index}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                            activeSection === index 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg' 
                            : 'bg-gray-700/50 hover:bg-gray-700'
                        }`}
                        onClick={() => setActiveSection(index)}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{section.icon}</span>
                            <div>
                            <h4 className="font-semibold text-white text-lg">{section.title}</h4>
                            <p className="text-white/70 text-sm">{section.year}</p>
                            </div>
                        </div>
                        </motion.button>
                    ))}
                    </div>
                </div>
                </motion.div>

                {/* Right Column - Active Section Content */}
                <motion.div 
                className="lg:col-span-8"
                key={activeSection}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                >
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    {/* Floating Elements */}
                    <motion.div
                    className="absolute -top-10 -left-10 w-20 h-20 bg-purple-500/10 rounded-full"
                    variants={floatingVariants}
                    animate="float"
                    />
                    <motion.div
                    className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-500/10 rounded-full"
                    variants={floatingVariants}
                    animate="float"
                    style={{ animationDelay: '2s' }}
                    />
                    
                    <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl">{storySections[activeSection].icon}</span>
                        <div>
                        <h3 className="font-bold text-white text-2xl md:text-3xl">
                            {storySections[activeSection].title}
                        </h3>
                        <span className="text-white/70">{storySections[activeSection].year}</span>
                        </div>
                    </div>
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-8">
                        {storySections[activeSection].content}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {storySections[activeSection].stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/10 rounded-lg p-4 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <p className="text-white font-semibold">{stat}</p>
                        </motion.div>
                        ))}
                    </div>

                    <motion.img
                        src={storySections[activeSection].image}
                        alt={storySections[activeSection].title}
                        className="w-full h-64 object-cover rounded-xl shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    />
                    </div>
                </div>
                </motion.div>

                {/* Full Width Bottom Section */}
                <motion.div 
                className="lg:col-span-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                >
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
                    
                    <div className="relative z-10 lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-md mb-8 lg:mb-0">
                        <h3 className="font-bold text-white text-2xl md:text-3xl mb-4">
                        Experience the Rexifi Difference Today
                        </h3>
                        <p className="text-white/70 text-lg mb-6">
                        Join over 1 million satisfied customers who trust Rexifi for 
                        reliable, high-speed internet that powers their digital lives.
                        </p>
                        <motion.a
                        href="#contact"
                        className="inline-block font-medium text-sm text-white rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-3 px-8"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        Start Your Journey with Rexifi
                        </motion.a>
                    </div>
                    
                    <motion.div
                        className="flex gap-6 text-center"
                        variants={itemVariants}
                    >
                        {[
                        { number: "1M+", label: "Happy Customers" },
                        { number: "99.9%", label: "Uptime Guarantee" },
                        { number: "24/7", label: "Support" }
                        ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-white"
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="text-2xl md:text-3xl font-bold text-orange-400">{stat.number}</div>
                            <div className="text-sm text-white/70">{stat.label}</div>
                        </motion.div>
                        ))}
                    </motion.div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-500/5 to-transparent rounded-full blur-3xl"></div>
                </div>
                </motion.div>
            </div>
            </div>

            {/* Additional Stats Section */}
            <motion.div 
            className="max-w-4xl mx-auto mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                { value: "50+", label: "Cities Covered", icon: "🏙️" },
                { value: "1M+", label: "Active Users", icon: "👥" },
                { value: "99.9%", label: "Network Reliability", icon: "⚡" },
                { value: "24/7", label: "Customer Support", icon: "🛡️" }
                ].map((stat, index) => (
                <motion.div
                    key={index}
                    className="bg-gray-800/50 rounded-xl p-6 text-center"
                    variants={itemVariants}
                    whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
                ))}
            </div>
            </motion.div>
        </div>
        </section>

        <RexifiFooter />
        
    </>
  );
};

export default RexifiStory;
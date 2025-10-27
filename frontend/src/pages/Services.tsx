import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiWifi, FiBriefcase, FiStar, FiCheck, FiPlay, FiUsers, FiShield, FiZap, FiGlobe } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

interface ColorMap {
  blue: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
  purple: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
  green: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
  orange: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
}

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: JSX.Element;
  color: keyof ColorMap;
  link: string;
  image: string;
  stats: Record<string, string>;
}

interface Plan {
  speed: string;
  price: string;
  popular: boolean;
  features: string[];
}

interface InternetPlans {
  fiber: {
    color: keyof ColorMap;
    plans: Plan[];
  };
  wireless: {
    color: keyof ColorMap;
    plans: Plan[];
  };
  enterprise: {
    color: keyof ColorMap;
    plans: Plan[];
  };
  free: {
    color: keyof ColorMap;
    plans: Plan[];
  };
}

interface Stat {
  number: string;
  label: string;
  icon: JSX.Element;
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      title: "Fiber and Radio Broadband",
      description: "Our service is completely independent of national telcos. Our fiber optic backbone and access networks ensure your data is secured with enterprise-grade encryption and reliability.",
      features: ["Up to 1Gbps speeds", "99.9% uptime guarantee", "24/7 dedicated support", "No data caps"],
      icon: <FiZap className="w-8 h-8" />,
      color: "blue",
      link: "/broadband",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500",
      stats: { speed: "1Gbps", latency: "5ms", coverage: "99.9%" }
    },
    {
      title: "SmartTV DNS-BOX",
      description: "Access USA/UK Netflix contents from anywhere. Enjoy more than 2500+ entertainment channels with crystal-clear streaming quality and no geographical restrictions.",
      features: ["2500+ channels", "4K streaming", "Zero buffering", "Multi-device support"],
      icon: <FiPlay className="w-8 h-8" />,
      color: "purple",
      link: "/tv-streaming",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
      stats: { channels: "2500+", quality: "4K", devices: "Unlimited" }
    },
    {
      title: "WiFi-Card Hotspots",
      description: "The most affordable unlimited internet across Africa. Designed for clustered areas, markets, large apartments and multi-dwelling units at disruptive pricing with seamless connectivity.",
      features: ["Unlimited data", "Pay-as-you-go", "Easy setup", "Portable hotspots"],
      icon: <FiWifi className="w-8 h-8" />,
      color: "green",
      link: "/all-for-mobile",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      stats: { coverage: "98%", users: "10+", cost: "Affordable" }
    },
    {
      title: "Enterprise Solutions",
      description: "Customized connectivity solutions for businesses with dedicated bandwidth, enhanced security, and priority support for mission-critical operations.",
      features: ["Dedicated bandwidth", "Enhanced security", "SLA guarantees", "24/7 monitoring"],
      icon: <FiBriefcase className="w-8 h-8" />,
      color: "orange",
      link: "/enterprise",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500",
      stats: { sla: "99.99%", support: "Priority", security: "Enterprise" }
    }
  ];

  const colorMap: ColorMap = {
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

  const [activeService, setActiveService] = useState(0);
  const [activePlanTab, setActivePlanTab] = useState<keyof InternetPlans>('fiber');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const internetPlans: InternetPlans = {
    fiber: {
      color: 'blue',
      plans: [
        { speed: '25 Mbps', price: '14,000', popular: false, features: ['HD Streaming', 'Online Gaming', '3-4 Devices'] },
        { speed: '30 Mbps', price: '19,000', popular: true, features: ['4K Streaming', 'Fast Downloads', '5-8 Devices'] },
        { speed: '35 Mbps', price: '24,000', popular: false, features: ['Multiple 4K Streams', 'Gaming + Streaming', '8-12 Devices'] },
        { speed: '40 Mbps', price: '34,000', popular: false, features: ['Ultra HD', 'Smart Home', '12+ Devices'] }
      ]
    },
    wireless: {
      color: 'green',
      plans: [
        { speed: '15 Mbps', price: '10,000', popular: false, features: ['Basic Browsing', 'SD Streaming', '1-2 Devices'] },
        { speed: '20 Mbps', price: '14,000', popular: true, features: ['HD Streaming', 'Video Calls', '3-5 Devices'] },
        { speed: '25 Mbps', price: '18,000', popular: false, features: ['4K Ready', 'Online Gaming', '5-8 Devices'] },
        { speed: '30 Mbps', price: '22,000', popular: false, features: ['4K Streaming', 'Smart Home', '8-10 Devices'] }
      ]
    },
    enterprise: {
      color: 'purple',
      plans: [
        { speed: '50 Mbps', price: '45,000', popular: false, features: ['Small Business', '10-15 Users', 'Basic Support'] },
        { speed: '100 Mbps', price: '75,000', popular: true, features: ['Medium Business', '15-30 Users', 'Priority Support'] },
        { speed: '200 Mbps', price: '120,000', popular: false, features: ['Large Business', '30-50 Users', 'Dedicated Support'] }
      ]
    },
    free: {
      color: 'orange',
      plans: [
        { speed: '5 Mbps', price: 'FREE', popular: false, features: ['Email & Browsing', 'Social Media', '1 Device'] },
        { speed: '8 Mbps', price: 'FREE', popular: true, features: ['SD Streaming', 'Video Calls', '2-3 Devices'] },
        { speed: '10 Mbps', price: 'FREE', popular: false, features: ['HD Ready', 'Online Learning', '3-4 Devices'] }
      ]
    }
  };

  const stats: Stat[] = [
    { number: "50K+", label: "Happy Customers", icon: <FiUsers className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <FiShield className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <FiStar className="w-6 h-6" /> },
    { number: "50+", label: "Cities Covered", icon: <FiGlobe className="w-6 h-6" /> }
  ];

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
        ease: "easeOut" as const
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 container mx-auto mt-16 px-4">
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
                🚀 REVOLUTIONARY INTERNET SOLUTIONS
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Experience The Future
                <br />
                Of <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connectivity</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Ultra-fast, reliable internet solutions powered by cutting-edge technology. 
                Transform how you work, stream, and connect with the world.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  Explore Services
                  <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <FiPlay className="w-5 h-5 ml-1" />
                  </div>
                  Watch Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                >
                  <div className="text-blue-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interactive Services Showcase */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Premium</span> Services
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover our range of internet solutions designed to meet every need, from casual browsing to enterprise-level connectivity.
              </motion.p>
            </motion.div>

            {/* Service Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveService(index)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeService === index
                      ? `${colorMap[service.color].solid} text-white shadow-lg`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {service.title}
                </motion.button>
              ))}
            </div>

            {/* Active Service Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorMap[services[activeService].color].bg} mb-6`}
                  >
                    <div className={colorMap[services[activeService].color].text}>
                      {services[activeService].icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {services[activeService].title}
                  </h3>
                  
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {services[activeService].description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(services[activeService].stats).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-center p-4 bg-white/5 rounded-xl"
                      >
                        <div className="text-2xl font-bold text-white mb-1">{value}</div>
                        <div className="text-xs text-gray-400 uppercase">{key}</div>
                      </motion.div>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {services[activeService].features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <FiCheck className={`w-5 h-5 ${colorMap[services[activeService].color].text} mr-3`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${colorMap[services[activeService].color].solid} text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg`}
                  >
                    Learn More
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <img
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorMap[services[activeService].color].gradient}`}></div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Affordable <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Pricing</span> Plans
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Choose the perfect plan for your needs. All plans include our premium features and dedicated support.
              </motion.p>
            </motion.div>

            {/* Plan Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(internetPlans).map(([key, plan]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePlanTab(key as keyof InternetPlans)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activePlanTab === key
                      ? `${colorMap[plan.color].solid} text-white shadow-lg`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)} Plans
                </motion.button>
              ))}
            </div>

            {/* Plans Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {internetPlans[activePlanTab].plans.map((plan, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover="hover"
                  className={`group relative p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${
                    plan.popular 
                      ? `${colorMap[internetPlans[activePlanTab].color].border} border-2 shadow-2xl scale-105` 
                      : 'border-gray-700'
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`${colorMap[internetPlans[activePlanTab].color].solid} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.speed}</h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.price !== 'FREE' && <span className="text-gray-400">/month</span>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <FiCheck className={`w-5 h-5 ${colorMap[internetPlans[activePlanTab].color].text} mr-3`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? `${colorMap[internetPlans[activePlanTab].color].solid} text-white hover:shadow-lg`
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {plan.price === 'FREE' ? 'Get Started Free' : 'Subscribe Now'}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsVideoPlaying(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
                >
                  ✕
                </button>
                <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    src="/demo-video.mp4" // Replace with actual video path
                  />
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

export default ServicesSection;
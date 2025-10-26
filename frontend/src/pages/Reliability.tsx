import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiServer, FiZap, FiShield, FiActivity, FiBarChart2, FiAward, FiUsers, FiGlobe, FiRefreshCw } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

// Define TypeScript interfaces
interface ColorConfig {
  bg: string;
  text: string;
  border: string;
  hover: string;
  gradient: string;
  solid: string;
}

interface ColorMap {
  blue: ColorConfig;
  purple: ColorConfig;
  green: ColorConfig;
  orange: ColorConfig;
}

interface ReliabilityMetric {
  value: number;
  target: number;
  trend: 'up' | 'down';
  icon: React.ReactElement;
  color: keyof ColorMap;
  description: string;
  unit: string;
}

interface NetworkComponent {
  component: string;
  status: string;
  capacity: string;
  redundancy: string;
  icon: React.ReactElement;
  color: keyof ColorMap;
}

interface ServiceLevel {
  plan: string;
  uptime: string;
  support: string;
  response: string;
  color: keyof ColorMap;
}

interface ProgressGaugeProps {
  value: number;
  max?: number;
  color: keyof ColorMap;
  size?: 'sm' | 'md' | 'lg';
}

type ReliabilityMetricsKey = 'uptime' | 'latency' | 'packetLoss' | 'incidents';

const ReliabilityPage = () => {
  const [activeMetric, setActiveMetric] = useState<ReliabilityMetricsKey>('uptime');
  const [currentUptime, setCurrentUptime] = useState(99.98);
  const [isLiveData, setIsLiveData] = useState(true);

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

  const reliabilityMetrics: Record<ReliabilityMetricsKey, ReliabilityMetric> = {
    uptime: {
      value: 99.98,
      target: 99.9,
      trend: 'up',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'green',
      description: 'Network Availability',
      unit: '%'
    },
    latency: {
      value: 12,
      target: 20,
      trend: 'down',
      icon: <FiZap className="w-6 h-6" />,
      color: 'blue',
      description: 'Average Latency',
      unit: 'ms'
    },
    packetLoss: {
      value: 0.02,
      target: 0.1,
      trend: 'down',
      icon: <FiBarChart2 className="w-6 h-6" />,
      color: 'purple',
      description: 'Packet Loss',
      unit: '%'
    },
    incidents: {
      value: 2,
      target: 5,
      trend: 'down',
      icon: <FiShield className="w-6 h-6" />,
      color: 'orange',
      description: 'Monthly Incidents',
      unit: ''
    }
  };

  const networkInfrastructure: NetworkComponent[] = [
    {
      component: 'Fiber Backbone',
      status: 'optimal',
      capacity: '98%',
      redundancy: 'N+1',
      icon: <FiServer className="w-8 h-8" />,
      color: 'blue'
    },
    {
      component: 'Wireless Towers',
      status: 'optimal',
      capacity: '92%',
      redundancy: '2N',
      icon: <FiGlobe className="w-8 h-8" />,
      color: 'green'
    },
    {
      component: 'Data Centers',
      status: 'optimal',
      capacity: '85%',
      redundancy: 'N+2',
      icon: <FiAward className="w-8 h-8" />,
      color: 'purple'
    },
    {
      component: 'Peering Points',
      status: 'optimal',
      capacity: '78%',
      redundancy: 'Multiple',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'orange'
    }
  ];

  const serviceLevels: ServiceLevel[] = [
    {
      plan: 'Residential',
      uptime: '99.9%',
      support: '24/7 Chat',
      response: '4 hours',
      color: 'blue'
    },
    {
      plan: 'Business',
      uptime: '99.95%',
      support: '24/7 Phone',
      response: '2 hours',
      color: 'green'
    },
    {
      plan: 'Enterprise',
      uptime: '99.99%',
      support: 'Dedicated',
      response: '30 minutes',
      color: 'purple'
    }
  ];

  // Simulate live data updates
  useEffect(() => {
    if (!isLiveData) return;

    const interval = setInterval(() => {
      setCurrentUptime(prev => {
        const variation = (Math.random() - 0.5) * 0.02;
        return Math.max(99.9, Math.min(99.99, prev + variation));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveData]);

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
    }
  };

  const gaugeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  };

  const ProgressGauge = ({ value, max = 100, color, size = 'lg' }: ProgressGaugeProps) => {
    const percentage = (value / max) * 100;
    const sizes = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32'
    };

    return (
      <motion.div
        variants={gaugeVariants}
        className={`relative ${sizes[size]} mx-auto`}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="283" strokeDashoffset={283 - (283 * percentage) / 100}
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
            className={colorMap[color].text}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${size === 'lg' ? 'text-2xl' : 'text-lg'} ${colorMap[color].text}`}>
            {value}{size === 'lg' && '%'}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
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
              🛡️ NETWORK RELIABILITY
              </motion.span>
              
              <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-green-100 to-blue-200 bg-clip-text text-transparent"
              >
              Unmatched
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Network Reliability</span>
              </motion.h1>
              
              <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
              Experience peace of mind with our carrier-grade network infrastructure. 
              We deliver consistent, reliable connectivity with 99.98% uptime guarantee.
              </motion.p>

              {/* Live Uptime Counter */}
              <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-4 bg-white/5 rounded-2xl px-6 py-4 border border-green-500/20"
              >
              <div className="flex items-center gap-2">
                  <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                  />
                  <span className="text-green-400 font-semibold">LIVE</span>
              </div>
              <div className="text-3xl font-bold text-white">
                  {currentUptime.toFixed(2)}%
              </div>
              <div className="text-gray-400">Current Uptime</div>
              </motion.div>
          </motion.div>
          </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="py-16">
          <div className="container mx-auto px-4">
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
          >
              <motion.h2 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
              Reliability <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Metrics</span>
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
              Real-time monitoring of our network performance and service quality
              </motion.p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {(Object.keys(reliabilityMetrics) as ReliabilityMetricsKey[]).map((key) => {
                const metric = reliabilityMetrics[key];
                return (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveMetric(key)}
                    className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 cursor-pointer transition-all duration-300 ${
                      activeMetric === key 
                        ? `${colorMap[metric.color].border} shadow-2xl` 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colorMap[metric.color].bg}`}>
                        <div className={colorMap[metric.color].text}>
                          {metric.icon}
                        </div>
                      </div>
                      <motion.div
                        animate={metric.trend === 'up' ? { y: [0, -2, 0] } : { y: [0, 2, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-green-400' : 'text-blue-400'
                        }`}
                      >
                        {metric.trend === 'up' ? '↗' : '↘'}
                      </motion.div>
                    </div>
                    
                    <div className="text-3xl font-bold text-white mb-1">
                      {metric.value}
                      {metric.unit}
                    </div>
                    <div className="text-gray-400 text-sm mb-2">{metric.description}</div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Target: {metric.target}{metric.unit}</span>
                      <span className={`${
                        metric.value >= metric.target ? 'text-green-400' : 'text-orange-400'
                      }`}>
                        {metric.value >= metric.target ? '✓ Exceeded' : '✓ Met'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Detailed Metric View */}
          <AnimatePresence mode="wait">
              <motion.div
              key={activeMetric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50"
              >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                      {reliabilityMetrics[activeMetric].description} Analysis
                  </h3>
                  <p className="text-gray-400 mb-6">
                      Our {reliabilityMetrics[activeMetric].description.toLowerCase()} consistently exceeds industry standards, 
                      ensuring optimal performance for all your connectivity needs.
                  </p>
                  
                  <div className="space-y-3">
                      <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current Value</span>
                      <span className="text-white font-semibold">
                          {reliabilityMetrics[activeMetric].value}{reliabilityMetrics[activeMetric].unit}
                      </span>
                      </div>
                      <div className="flex justify-between items-center">
                      <span className="text-gray-400">Industry Average</span>
                      <span className="text-gray-300">
                          {(reliabilityMetrics[activeMetric].target * 0.9).toFixed(2)}{reliabilityMetrics[activeMetric].unit}
                      </span>
                      </div>
                      <div className="flex justify-between items-center">
                      <span className="text-gray-400">Our Target</span>
                      <span className="text-green-400 font-semibold">
                          {reliabilityMetrics[activeMetric].target}{reliabilityMetrics[activeMetric].unit}
                      </span>
                      </div>
                  </div>
                  </div>
                  
                  <div className="flex justify-center">
                  <ProgressGauge 
                      value={reliabilityMetrics[activeMetric].value} 
                      max={activeMetric === 'packetLoss' ? 1 : 100}
                      color={reliabilityMetrics[activeMetric].color}
                      size="lg"
                  />
                  </div>
              </div>
              </motion.div>
          </AnimatePresence>
          </div>
      </section>

      {/* Network Infrastructure */}
      <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
          >
              <motion.h2 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
              Robust <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Infrastructure</span>
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
              Built with redundancy and scalability to ensure uninterrupted service
              </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {networkInfrastructure.map((component) => (
              <motion.div
                  key={component.component}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
              >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorMap[component.color].bg} mb-4`}>
                  <div className={colorMap[component.color].text}>
                      {component.icon}
                  </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{component.component}</h3>
                  
                  <div className="space-y-2">
                  <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Status</span>
                      <span className="flex items-center gap-1 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {component.status}
                      </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Capacity</span>
                      <span className="text-white text-sm">{component.capacity}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Redundancy</span>
                      <span className="text-blue-400 text-sm">{component.redundancy}</span>
                  </div>
                  </div>
              </motion.div>
              ))}
          </div>
          </div>
      </section>

      {/* Service Level Agreements */}
      <section className="py-16">
          <div className="container mx-auto px-4">
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
          >
              <motion.h2 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
              Service Level <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Guarantees</span>
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
              Our commitment to reliability backed by comprehensive service level agreements
              </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {serviceLevels.map((service) => (
              <motion.div
                  key={service.plan}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${colorMap[service.color].border}`}
              >
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{service.plan}</h3>
                  
                  <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white mb-1">{service.uptime}</div>
                  <div className="text-gray-400">Uptime Guarantee</div>
                  </div>
                  
                  <div className="space-y-4">
                  <div className="flex justify-between items-center">
                      <span className="text-gray-400">Support</span>
                      <span className="text-white font-semibold">{service.support}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-green-400 font-semibold">{service.response}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                      <span className="text-gray-400">Credit Policy</span>
                      <span className="text-blue-400 font-semibold">Active</span>
                  </div>
                  </div>
                  
                  <button className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${colorMap[service.color].solid} text-white hover:shadow-lg`}>
                  View SLA Details
                  </button>
              </motion.div>
              ))}
          </div>
          </div>
      </section>

      {/* Live Status Footer */}
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="fixed bottom-6 right-6 z-50"
      >
          <div className="flex items-center gap-3 bg-gray-900/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-green-500/20 shadow-2xl">
          <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full"
          />
          <span className="text-white font-semibold">All Systems Operational</span>
          <button 
              onClick={() => setIsLiveData(!isLiveData)}
              className="text-gray-400 hover:text-white transition-colors"
          >
              <FiRefreshCw className="w-4 h-4" />
          </button>
          </div>
      </motion.div>
      </div>

      <RexifiFooter />
    </>
  );
};

export default ReliabilityPage;
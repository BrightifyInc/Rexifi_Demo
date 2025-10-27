import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiWifi, FiBriefcase, FiGift, FiZap, FiCheck, FiDownload, FiUpload } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

interface Plan {
  speed: string;
  price: string;
  popular: boolean;
  upload: string;
  devices: string;
  bestFor: string[];
  features: string[];
  description?: string;
}

interface PlanType {
  color: 'blue' | 'purple' | 'green' | 'orange';
  icon: JSX.Element;
  title: string;
  description: string;
  plans: Plan[];
}

interface InternetPlansData {
  fiber: PlanType;
  wireless: PlanType;
  enterprise: PlanType;
  free: PlanType;
}

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

interface UsageExample {
  speed: string;
  activities: string[];
  users: string;
}

interface Stat {
  speed: string;
  label: string;
  color: keyof ColorMap;
}

const InternetPlansPage = () => {
  const [activePlanTab, setActivePlanTab] = useState<keyof InternetPlansData>('fiber');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

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

  const internetPlans: InternetPlansData = {
    fiber: {
      color: 'blue',
      icon: <FiZap className="w-6 h-6" />,
      title: "Fiber Optic",
      description: "Lightning-fast fiber internet with symmetrical speeds and ultra-low latency",
      plans: [
        { 
          speed: '25 Mbps', 
          price: '14,000', 
          popular: false,
          upload: '25 Mbps',
          devices: '3-5 devices',
          bestFor: ['HD Streaming', 'Online Gaming', 'Small Families'],
          features: ['Symmetrical Speeds', '99.9% Uptime', 'Free Router']
        },
        { 
          speed: '30 Mbps', 
          price: '19,000', 
          popular: true,
          upload: '30 Mbps',
          devices: '5-8 devices',
          bestFor: ['4K Streaming', 'Work from Home', 'Medium Families'],
          features: ['Priority Support', 'Enhanced Security', 'Free Installation']
        },
        { 
          speed: '35 Mbps', 
          price: '24,000', 
          popular: false,
          upload: '35 Mbps',
          devices: '8-12 devices',
          bestFor: ['Multiple 4K Streams', 'Smart Home', 'Large Families'],
          features: ['Static IP Included', 'Advanced Security', '24/7 Monitoring']
        },
        { 
          speed: '40 Mbps', 
          price: '34,000', 
          popular: false,
          upload: '40 Mbps',
          devices: '12+ devices',
          bestFor: ['Gaming & Streaming', 'Home Office', 'Content Creation'],
          features: ['Dedicated Support', 'Business-grade', 'Cloud Backup']
        }
      ]
    },
    wireless: {
      color: 'green',
      icon: <FiWifi className="w-6 h-6" />,
      title: "Wireless Broadband",
      description: "Reliable wireless internet perfect for residential areas with quick setup",
      plans: [
        { 
          speed: '15 Mbps', 
          price: '10,000', 
          popular: false,
          upload: '5 Mbps',
          devices: '1-3 devices',
          bestFor: ['Basic Browsing', 'Email', 'Single User'],
          features: ['Easy Setup', 'No Contract', 'Basic Support']
        },
        { 
          speed: '20 Mbps', 
          price: '14,000', 
          popular: true,
          upload: '8 Mbps',
          devices: '3-5 devices',
          bestFor: ['HD Streaming', 'Video Calls', 'Small Families'],
          features: ['Free Installation', 'WiFi Router', 'Standard Support']
        },
        { 
          speed: '25 Mbps', 
          price: '18,000', 
          popular: false,
          upload: '10 Mbps',
          devices: '5-8 devices',
          bestFor: ['4K Ready', 'Online Learning', 'Medium Families'],
          features: ['Enhanced Router', 'Parental Controls', 'Priority Support']
        },
        { 
          speed: '30 Mbps', 
          price: '22,000', 
          popular: false,
          upload: '12 Mbps',
          devices: '8-10 devices',
          bestFor: ['Smart Home', 'Multiple Users', 'Entertainment'],
          features: ['Advanced Security', 'Mesh WiFi Ready', '24/7 Support']
        }
      ]
    },
    enterprise: {
      color: 'purple',
      icon: <FiBriefcase className="w-6 h-6" />,
      title: "Enterprise Solutions",
      description: "Dedicated business-grade connectivity with SLA guarantees and premium support",
      plans: [
        { 
          speed: '50 Mbps', 
          price: '45,000', 
          popular: false,
          upload: '50 Mbps',
          devices: '10-15 users',
          bestFor: ['Small Business', 'Startups', 'Remote Teams'],
          features: ['SLA 99.9%', 'Basic Support', 'Standard Security']
        },
        { 
          speed: '100 Mbps', 
          price: '75,000', 
          popular: true,
          upload: '100 Mbps',
          devices: '15-30 users',
          bestFor: ['Medium Business', 'E-commerce', 'Growing Teams'],
          features: ['SLA 99.95%', 'Priority Support', 'Enhanced Security']
        },
        { 
          speed: '200 Mbps', 
          price: '120,000', 
          popular: false,
          upload: '200 Mbps',
          devices: '30-50 users',
          bestFor: ['Large Business', 'Enterprises', 'Multiple Locations'],
          features: ['SLA 99.99%', 'Dedicated Support', 'Advanced Security']
        }
      ]
    },
    free: {
      color: 'orange',
      icon: <FiGift className="w-6 h-6" />,
      title: "Free Community Internet",
      description: "Basic connectivity for underserved communities with essential online access",
      plans: [
        { 
          speed: '5 Mbps', 
          price: 'FREE', 
          popular: false,
          upload: '2 Mbps',
          devices: '1 device',
          bestFor: ['Basic Browsing', 'Social Media', 'Essential Services'],
          features: ['Community Access', 'Basic Security', 'Email Support'],
          description: 'Basic browsing and essential online services'
        },
        { 
          speed: '8 Mbps', 
          price: 'FREE', 
          popular: true,
          upload: '3 Mbps',
          devices: '2-3 devices',
          bestFor: ['SD Streaming', 'Video Calls', 'Online Learning'],
          features: ['Educational Access', 'Standard Security', 'Chat Support'],
          description: 'Standard streaming and communication'
        },
        { 
          speed: '10 Mbps', 
          price: 'FREE', 
          popular: false,
          upload: '4 Mbps',
          devices: '3-4 devices',
          bestFor: ['HD Ready', 'Remote Learning', 'Small Families'],
          features: ['Premium Access', 'Enhanced Security', 'Phone Support'],
          description: 'Premium experience for community development'
        }
      ]
    }
  };

  const usageExamples: UsageExample[] = [
    { speed: '5-10 Mbps', activities: ['Email', 'Web Browsing', 'Social Media'], users: '1-2' },
    { speed: '15-25 Mbps', activities: ['HD Streaming', 'Video Calls', 'Online Gaming'], users: '3-4' },
    { speed: '30-50 Mbps', activities: ['4K Streaming', 'Smart Home', 'Remote Work'], users: '5-8' },
    { speed: '100+ Mbps', activities: ['Multiple 4K Streams', 'Gaming', 'Large Downloads'], users: '10+' }
  ];

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
        ease: "easeOut" as const
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 }
  };

  const currentPlanType = internetPlans[activePlanTab];

  const stats: Stat[] = [
    { speed: "1Gbps", label: "Max Fiber Speed", color: "blue" },
    { speed: "99.9%", label: "Uptime Guarantee", color: "green" },
    { speed: "24/7", label: "Support", color: "purple" },
    { speed: "0ms", label: "Lowest Latency", color: "orange" }
  ];

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
                ⚡ INTERNET PLANS
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Find Your Perfect
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Internet Plan</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Experience blazing-fast speeds with our range of affordable internet plans. 
                From basic browsing to enterprise solutions, we have the perfect connection for your needs.
              </motion.p>
            </motion.div>

            {/* Speed Indicator */}
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
                  <div className={`text-2xl md:text-3xl font-bold ${colorMap[stat.color].text} mb-1`}>{stat.speed}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Plan Selection */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Plan Type Tabs */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Choose Your <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Plan Type</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Select the technology that best fits your needs and budget
              </motion.p>
            </motion.div>

            {/* Technology Tabs */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {Object.entries(internetPlans).map(([key, plan]) => (
                <motion.button
                  key={key}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePlanTab(key as keyof InternetPlansData)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    activePlanTab === key
                      ? `${colorMap[plan.color].solid} text-white shadow-2xl`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className={activePlanTab === key ? 'text-white' : colorMap[plan.color].text}>
                    {plan.icon}
                  </div>
                  {plan.title}
                </motion.button>
              ))}
            </motion.div>

            {/* Plan Type Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colorMap[currentPlanType.color].bg} mb-4`}>
                <div className={colorMap[currentPlanType.color].text}>
                  {currentPlanType.icon}
                </div>
                <span className={colorMap[currentPlanType.color].text}>
                  {currentPlanType.title}
                </span>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {currentPlanType.description}
              </p>
            </motion.div>

            {/* Plans Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              <AnimatePresence mode="wait">
                {currentPlanType.plans.map((plan, index) => (
                  <motion.div
                    key={`${activePlanTab}-${index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover="hover"
                    variants={cardHoverVariants}
                    onClick={() => setSelectedPlan(plan)}
                    className={`group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan
                        ? `${colorMap[currentPlanType.color].border} border-2 shadow-2xl scale-105` 
                        : 'border-gray-700 hover:border-gray-600'
                    } ${plan.popular ? 'ring-2 ring-yellow-400/20' : ''}`}
                  >
                    {plan.popular && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                      >
                        <span className={`${colorMap[currentPlanType.color].solid} text-white px-4 py-1 rounded-full text-[11px] font-semibold shadow-lg`}>
                          ⭐ MOST POPULAR
                        </span>
                      </motion.div>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.speed}</h3>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        {plan.price !== 'FREE' && (
                          <span className="text-gray-400 text-sm">/month</span>
                        )}
                      </div>
                      {plan.description && (
                        <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                      )}
                    </div>

                    {/* Speed Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <FiDownload className={`w-5 h-5 ${colorMap[currentPlanType.color].text} mx-auto mb-1`} />
                        <div className="text-white font-semibold">{plan.speed}</div>
                        <div className="text-gray-400 text-xs">Download</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <FiUpload className={`w-5 h-5 ${colorMap[currentPlanType.color].text} mx-auto mb-1`} />
                        <div className="text-white font-semibold">{plan.upload}</div>
                        <div className="text-gray-400 text-xs">Upload</div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Perfect For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.bestFor.map((use: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <FiCheck className={`w-4 h-4 ${colorMap[currentPlanType.color].text} mr-2 flex-shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? `${colorMap[currentPlanType.color].solid} text-white hover:shadow-lg`
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {plan.price === 'FREE' ? 'Get Started Free' : 'Subscribe Now'}
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Usage Guide */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Speed Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {usageExamples.map((example, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-white/5 rounded-xl"
                  >
                    <div className="text-lg font-bold text-white mb-2">{example.speed}</div>
                    <div className="text-sm text-gray-400 mb-3">Supports {example.users} users</div>
                    <div className="space-y-1">
                      {example.activities.map((activity, idx) => (
                        <div key={idx} className="text-xs text-gray-300">{activity}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Experience <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Lightning Fast</span> Internet?
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers enjoying reliable, high-speed internet
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  Check Availability in Your Area
                </button>
                <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-white hover:text-white">
                  Talk to Sales Expert
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <RexifiFooter />
    </>
  );
};

export default InternetPlansPage;
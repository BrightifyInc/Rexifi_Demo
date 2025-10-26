import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiWifi, FiZap, FiServer, FiGlobe, FiCheck, FiArrowRight, FiInfo, FiTool, FiClock, FiUsers, FiShield } from 'react-icons/fi';

// Define types
interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: JSX.Element;
  color: 'blue' | 'purple' | 'green' | 'orange';
  features: string[];
  installationTime: string;
  bestFor: string[];
  popular: boolean;
}

interface ColorMap {
  bg: string;
  text: string;
  border: string;
  hover: string;
  gradient: string;
  solid: string;
}

const InstallationFeesSection = () => {
  const [selectedPlan, setSelectedPlan] = useState('fiber');
  const [showContactForm, setShowContactForm] = useState(false);

  const installationPlans: Plan[] = [
    {
      id: 'fiber',
      name: 'Fiber Optic Installation',
      price: '₦60,000',
      description: 'Ultra-fast fiber optic connection for homes and businesses',
      icon: <FiZap className="w-8 h-8" />,
      color: 'blue',
      features: [
        'Symmetrical gigabit speeds',
        'Professional installation',
        'Free basic router',
        'WiFi setup included',
        '24/7 technical support',
        '1-year warranty'
      ],
      installationTime: '2-4 hours',
      bestFor: ['Families', 'Remote workers', 'Streaming enthusiasts', 'Small businesses'],
      popular: true
    },
    {
      id: 'wireless',
      name: 'Wireless Radio Installation',
      price: '₦174,000',
      description: 'Reliable wireless broadband for areas without fiber infrastructure',
      icon: <FiWifi className="w-8 h-8" />,
      color: 'green',
      features: [
        'High-speed wireless connection',
        'Outdoor antenna installation',
        'Weather-resistant equipment',
        'Up to 100Mbps speeds',
        'Professional mounting',
        'Signal optimization'
      ],
      installationTime: '3-5 hours',
      bestFor: ['Suburban areas', 'Rural communities', 'Temporary setups', 'Construction sites'],
      popular: false
    },
    {
      id: 'dedicated',
      name: 'Dedicated Enterprise',
      price: '₦800,000',
      description: 'Premium dedicated connection for mission-critical business operations',
      icon: <FiServer className="w-8 h-8" />,
      color: 'purple',
      features: [
        'Dedicated fiber line',
        'SLA guarantee 99.9%',
        'Static IP addresses',
        'Advanced security',
        '24/7 priority support',
        'Business-grade equipment'
      ],
      installationTime: '5-7 business days',
      bestFor: ['Large enterprises', 'Data centers', 'Banks', 'Hospitals', 'Government'],
      popular: false
    },
    {
      id: 'starlink',
      name: 'Starlink Satellite',
      price: 'Request Quote',
      description: 'Global satellite internet for remote and challenging locations',
      icon: <FiGlobe className="w-8 h-8" />,
      color: 'orange',
      features: [
        'Global coverage',
        'Low Earth orbit technology',
        'Easy self-installation',
        'Portable option available',
        'Weather resistant',
        'No ground infrastructure'
      ],
      installationTime: '1-2 weeks delivery',
      bestFor: ['Remote locations', 'Maritime', 'Aviation', 'Emergency services', 'Expeditions'],
      popular: false
    }
  ];

  const colorMap: Record<'blue' | 'purple' | 'green' | 'orange', ColorMap> = {
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

  const currentPlan = installationPlans.find(plan => plan.id === selectedPlan);

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

  // Handle tab change
  const handleTabChange = (planId: string) => {
    setSelectedPlan(planId);
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    setShowContactForm(false);
  };

  // Add null check for currentPlan
  if (!currentPlan) {
    return null;
  }

  return (
    <section className="py-14 md:py-28 bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="wrapper relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-3 font-bold text-center text-white text-3xl md:text-5xl"
          >
            Professional Installation Services
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto leading-6 text-white/50 text-lg"
          >
            Get connected with our expert installation team. Choose the perfect solution 
            for your needs with transparent pricing and professional service.
          </motion.p>
        </motion.div>

        {/* Installation Plans Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Plan Selection Tabs */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {installationPlans.map((plan) => (
              <motion.button
                key={plan.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(plan.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? `${colorMap[plan.color].solid} text-white shadow-2xl`
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className={selectedPlan === plan.id ? 'text-white' : colorMap[plan.color].text}>
                  {plan.icon}
                </div>
                {plan.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Selected Plan Details */}
            <motion.div
              layout
              className="lg:col-span-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlan.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className={`relative rounded-3xl p-8 border-2 ${colorMap[currentPlan.color].border} bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl`}
                >
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
                  </div>

                  {/* Plan Header */}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className={`p-4 rounded-2xl ${colorMap[currentPlan.color].bg}`}>
                        <div className={colorMap[currentPlan.color].text}>
                          {currentPlan.icon}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {currentPlan.name}
                          </h3>
                          {currentPlan.popular && (
                            <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 text-lg">
                          {currentPlan.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {currentPlan.price}
                      </div>
                      <div className="text-white/50">
                        One-time installation fee
                      </div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <FiCheck className={colorMap[currentPlan.color].text} />
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {currentPlan.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 text-white/80"
                          >
                            <div className={`w-2 h-2 rounded-full ${colorMap[currentPlan.color].solid}`} />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <FiUsers className={colorMap[currentPlan.color].text} />
                        Perfect For
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentPlan.bestFor.map((useCase, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`px-3 py-2 rounded-full text-sm ${colorMap[currentPlan.color].bg} ${colorMap[currentPlan.color].text} border ${colorMap[currentPlan.color].border}`}
                          >
                            {useCase}
                          </motion.span>
                        ))}
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-white/80">
                          <FiClock className={colorMap[currentPlan.color].text} />
                          <span>Installation Time: <strong>{currentPlan.installationTime}</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <FiTool className={colorMap[currentPlan.color].text} />
                          <span>Professional equipment setup included</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <FiShield className={colorMap[currentPlan.color].text} />
                          <span>Quality guaranteed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => currentPlan.id === 'starlink' ? setShowContactForm(true) : console.log('Schedule installation for:', currentPlan.name)}
                    className={`relative z-10 w-full ${colorMap[currentPlan.color].solid} text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3`}
                  >
                    {currentPlan.id === 'starlink' ? (
                      <>
                        <FiInfo className="w-5 h-5" />
                        Request a Call Back
                        <FiArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Schedule Installation
                        <FiArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Additional Info Sidebar */}
            <motion.div
              variants={containerVariants}
              className="lg:col-span-4"
            >
              <div className="space-y-6">
                {/* Why Choose Rexifi */}
                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl p-6 border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <h4 className="font-semibold text-white mb-4 text-lg">
                    Why Choose Rexifi Installation?
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Certified technicians",
                      "Quality equipment",
                      "Clean installation",
                      "After-installation support",
                      "Warranty on workmanship",
                      "Free site survey"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 text-white/80">
                        <FiCheck className="w-4 h-4 text-green-400" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Process Timeline */}
                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl p-6 border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <h4 className="font-semibold text-white mb-4 text-lg">
                    Installation Process
                  </h4>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Site Survey", desc: "Technical assessment" },
                      { step: "2", title: "Equipment Setup", desc: "Professional installation" },
                      { step: "3", title: "Configuration", desc: "Network optimization" },
                      { step: "4", title: "Testing", desc: "Quality assurance" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {item.step}
                        </div>
                        <div>
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="text-sm text-white/60">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>

          {/* Help Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-8 overflow-hidden border-2 border-green-500/20 mt-8 relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
            </div>

            <h3 className="font-bold text-white text-2xl md:text-4xl mb-4 text-center relative z-10">Need Help Choosing?</h3>
            <p className="text-blue-100 mb-4 text-sm text-center relative z-10">
              Our experts can recommend the best installation type for your specific needs.
            </p>
            <button 
              onClick={() => setShowContactForm(true)}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative z-10"
            >
              Consult Our Experts
            </button>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gray-800 rounded-3xl max-w-md w-full p-8 border-2 border-blue-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Request Installation Quote
              </h3>
              <p className="text-white/70 mb-6">
                Our team will contact you within 24 hours to discuss your installation needs.
              </p>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
                <select 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  required
                >
                  <option value="">Select Installation Type</option>
                  {installationPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                  ))}
                </select>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-6 py-3 text-white/70 border border-gray-600 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Request Call
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InstallationFeesSection;
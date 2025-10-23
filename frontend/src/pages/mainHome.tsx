
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FiArrowRight, FiChevronDown, FiArrowUpRight, FiHelpCircle, FiUser, FiZap, FiWifi, FiSearch } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

import AboutUs from './AboutUs.js';
import Navbar from "../components/Navbar.js";
import BenefitsSection from "../components/Benefits.js";
import RexifiTestimonials from "../components/Testimonials.jsx";
import InstallationFeesSection from "../components/InstallationPrice.js";
import RexifiFooter from '../components/Footer.js';

import FreeSurveyModal from '../components/FreeSurveyModal.js';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          Beta Now Live!
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Fast Internet. Fair Price. For Everyone.
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Rexifi ensures your entire household can work, learn, and stream simultaneously with consistent, 
          high-speed internet everyone can count on.
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          <Link to="/free-survey">REQUEST A FREE SURVEY</Link>
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
    </motion.section>
  );
};



const Faq = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState(null);

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

  const supportCategories = [
    {
      id: 'general',
      name: 'General Help',
      icon: <FiHelpCircle className="w-6 h-6" />,
      color: 'blue',
      count: 15
    },
    {
      id: 'billing',
      name: 'Billing & Payments',
      icon: <FiUser className="w-6 h-6" />,
      color: 'green',
      count: 8
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: <FiZap className="w-6 h-6" />,
      color: 'purple',
      count: 12
    },
    {
      id: 'installation',
      name: 'Installation',
      icon: <FiWifi className="w-6 h-6" />,
      color: 'orange',
      count: 6
    }
  ];

  const faqData = {
    general: [
      {
        question: "How do I set up my Rexifi internet?",
        answer: "Setting up your Rexifi internet is quick and easy. Our technician will handle the installation, and you'll be online within 30 minutes of setup completion.",
        steps: ['Schedule installation', 'Technician visit', 'Equipment setup', 'Connect devices']
      },
      {
        question: "What's included in the installation?",
        answer: "Professional installation includes router setup, WiFi configuration, and basic device connectivity assistance.",
        popular: true
      },
      {
        question: "How can I check my data usage?",
        answer: "Log into your Rexifi account portal to view real-time data usage and set up usage alerts."
      }
    ],
    billing: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit/debit cards, bank transfers, and mobile money payments for your convenience.",
        popular: true
      },
      {
        question: "Can I change my plan anytime?",
        answer: "Yes! You can upgrade or downgrade your plan at any time through your account dashboard."
      }
    ],
    technical: [
      {
        question: "How do I reset my router?",
        answer: "Press and hold the reset button for 10 seconds. Wait 2 minutes for full reboot.",
        popular: true
      },
      {
        question: "Why is my internet slow?",
        answer: "Check device connections, restart your router, or contact support for network diagnostics."
      }
    ],
    installation: [
      {
        question: "How long does installation take?",
        answer: "Standard installation takes 1-2 hours depending on your location and requirements.",
        popular: true
      }
    ]
  };

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

  const filteredFAQs = faqData[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
     
    <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
        >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Questions</span>
            </motion.h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
        >
            {supportCategories.map((category) => (
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
                <div className={activeCategory === category.id ? 'text-white' : colorMap[category.color].text}>
                {category.icon}
                </div>
                {category.name}
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {category.count}
                </span>
            </motion.button>
            ))}
        </motion.div>

        {/* Search */}
        <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-8"
        >
            <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          layout
          className="max-w-4xl mx-auto space-y-4">
            {/* Remove the outer AnimatePresence since we're using layout animations */}
            {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id} // Use a unique ID instead of index for better performance
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden"
                >
                  <button
                      onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                      <div className="flex items-center gap-4">
                          {faq.popular && (
                              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Popular</span>
                          )}
                          <span className="text-lg font-semibold text-white">{faq.question}</span>
                      </div>
                      <motion.div
                          animate={{ rotate: selectedFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400"
                      >
                          <FiChevronDown className="w-5 h-5" />
                      </motion.div>
                  </button>
                    
                    {/* Use layout animation instead of nested AnimatePresence */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                        opacity: selectedFAQ === index ? 1 : 0, 
                        height: selectedFAQ === index ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {selectedFAQ === index && (
                      <div className="px-6 pb-6">
                          <p className="text-gray-300 mb-4">{faq.answer}</p>
                          {faq.steps && (
                              <div className="space-y-2">
                                  {faq.steps.map((step, stepIndex) => (
                                      <div key={stepIndex} className="flex items-center gap-3 text-gray-400">
                                          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                                              <span className="text-blue-400 text-sm">{stepIndex + 1}</span>
                                          </div>
                                          {step}
                                      </div>
                                  ))}
                              </div>
                          )}
                          <button className="mt-4 text-blue-400 hover:text-blue-300 flex items-center gap-2">
                              Read more <FiArrowRight className="w-4 h-4" />
                          </button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
            ))}


            
        </motion.div>
        </div>
    </section>

  );
};



const CTA = () => {
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

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

  return (
    <div className="bg-gray-950">
      
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
          >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Connectivity</span>?
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trusted Rexifi for their internet solutions
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                  onClick={() => setIsSurveyModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  // onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl"
              >
                  Request Your Free Survey
              </motion.button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-white hover:text-white">
                  Contact Sales: 1-800-REXIFI
              </button>
              </motion.div>
          </motion.div>
        </div>
    </section>

      {/* Modal Component */}
      <FreeSurveyModal 
        isOpen={isSurveyModalOpen} 
        onClose={() => setIsSurveyModalOpen(false)} 
      />
    </div>
  );
};




const MainHome = () => {
  return (
    <div className="relative">
      <Navbar />
      <AuroraHero />
      <AboutUs />
      <BenefitsSection />
      <RexifiTestimonials />
      <InstallationFeesSection />
      <CTA />
      <Faq />
      <RexifiFooter />
    </div>
  );
};

export default MainHome;




import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeadphones, FiMessageCircle, FiMail, FiZap, FiSearch, FiChevronDown, FiVideo, FiUser, FiWifi, FiArrowRight, FiHelpCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';
import type { ReactElement } from 'react';

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

interface SupportCategory {
  id: string;
  name: string;
  icon: ReactElement;
  color: keyof ColorMap;
  count: number;
}

interface FAQItem {
  question: string;
  answer: string;
  steps?: string[];
  popular?: boolean;
}

interface FAQData {
  general: FAQItem[];
  billing: FAQItem[];
  technical: FAQItem[];
  installation: FAQItem[];
}

interface SupportOption {
  title: string;
  description: string;
  icon: ReactElement;
  color: keyof ColorMap;
  responseTime: string;
  available: boolean;
}

interface QuickSolution {
  title: string;
  icon: string;
  time: string;
  difficulty: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Stat {
  number: string;
  label: string;
  color: keyof ColorMap;
}

const SupportPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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

  const supportCategories: SupportCategory[] = [
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

  const faqData: FAQData = {
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

  const supportOptions: SupportOption[] = [
    {
      title: "Live Chat",
      description: "Instant help from our support team",
      icon: <FiMessageCircle className="w-8 h-8" />,
      color: "blue",
      responseTime: "2-5 minutes",
      available: true
    },
    {
      title: "Email Support",
      description: "Detailed assistance via email",
      icon: <FiMail className="w-8 h-8" />,
      color: "green",
      responseTime: "1-2 hours",
      available: true
    },
    {
      title: "Phone Support",
      description: "Talk directly with our experts",
      icon: <FiHeadphones className="w-8 h-8" />,
      color: "purple",
      responseTime: "Instant",
      available: true
    },
    {
      title: "Video Guides",
      description: "Step-by-step tutorials",
      icon: <FiVideo className="w-8 h-8" />,
      color: "orange",
      responseTime: "On-demand",
      available: true
    }
  ];

  const quickSolutions: QuickSolution[] = [
    {
      title: "Router Troubleshooting",
      icon: "🔧",
      time: "5 min",
      difficulty: "Easy"
    },
    {
      title: "WiFi Optimization",
      icon: "📶",
      time: "10 min",
      difficulty: "Medium"
    },
    {
      title: "Speed Test Guide",
      icon: "⚡",
      time: "2 min",
      difficulty: "Easy"
    },
    {
      title: "Billing Issues",
      icon: "💳",
      time: "15 min",
      difficulty: "Medium"
    }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: Date.now() + 1,
          text: "Thanks for your message! Our support team will connect with you shortly. In the meantime, would you like to try our quick troubleshooting guide?",
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
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
        ease: "easeOut" as const
      }
    }
  };

  // Removed unused cardHoverVariants to fix TS6133 error

  const filteredFAQs = faqData[activeCategory as keyof FAQData].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats: Stat[] = [
    { number: "24/7", label: "Support Available", color: "blue" },
    { number: "2min", label: "Avg. Response Time", color: "green" },
    { number: "98%", label: "Satisfaction Rate", color: "purple" },
    { number: "50+", label: "Support Experts", color: "orange" }
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
                💬 SUPPORT CENTER
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                We're Here to
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Help You</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                24/7 customer support with real experts. Get instant help with your connectivity issues 
                through multiple support channels designed for your convenience.
              </motion.p>
            </motion.div>

            {/* Support Stats */}
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
                  <div className={`text-2xl md:text-3xl font-bold ${colorMap[stat.color].text} mb-1`}>{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support Options */}
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
                Get Help <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Your Way</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Choose the support method that works best for you. We're available around the clock.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${colorMap[option.color].border} cursor-pointer transition-all duration-300`}
                  onClick={() => option.title === 'Live Chat' && setIsChatOpen(true)}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorMap[option.color].bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={colorMap[option.color].text}>
                      {option.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Response time</span>
                    <span className={`text-sm font-semibold ${colorMap[option.color].text}`}>
                      {option.responseTime}
                    </span>
                  </div>
                  
                  {option.available && (
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm">Available now</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Solutions */}
            <motion.div
              variants={containerVariants}
              className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Quick Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-white/5 rounded-xl border border-gray-700/50 cursor-pointer hover:border-gray-600/50 transition-colors"
                  >
                    <div className="text-2xl mb-2">{solution.icon}</div>
                    <h4 className="font-semibold text-white mb-2">{solution.title}</h4>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{solution.time}</span>
                      <span className={`${
                        solution.difficulty === 'Easy' ? 'text-green-400' : 
                        solution.difficulty === 'Medium' ? 'text-yellow-400' : 'text-orange-400'
                      }`}>
                        {solution.difficulty}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-900/30">
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
              className="max-w-4xl mx-auto space-y-4"
            >
              <AnimatePresence>
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
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
                    
                    <AnimatePresence>
                      {selectedFAQ === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-300 mb-4">{faq.answer}</p>
                          {faq.steps && (
                            <div className="space-y-2">
                              {faq.steps.map((step: string, stepIndex: number) => (
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Live Chat Widget */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-80 h-96 flex flex-col">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div>
                        <div className="text-white font-semibold">Support Agent</div>
                        <div className="text-blue-100 text-sm">Online • 2 min response</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(false)}
                      className="text-white hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="bg-blue-500/20 rounded-2xl rounded-tl-none p-4">
                      <div className="text-white font-semibold mb-1">Rexifi Support</div>
                      <div className="text-blue-100">Hello! How can we help you today?</div>
                    </div>

                    {/* User Messages */}
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-2xl p-4 ${
                          msg.sender === 'user'
                            ? 'bg-gray-700 ml-8 rounded-tr-none'
                            : 'bg-blue-500/20 mr-8 rounded-tl-none'
                        }`}
                      >
                        <div className="text-white">{msg.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <FiArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Help Button */}
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center"
          >
            <FiMessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      <RexifiFooter />
    </>
  );
};

export default SupportPage;
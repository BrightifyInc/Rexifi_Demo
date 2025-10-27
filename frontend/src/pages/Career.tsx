import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMapPin, FiClock, FiDollarSign, FiUsers, FiAward, FiZap, FiPlay, FiArrowRight, FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

// Define types
interface JobCategory {
  id: string;
  label: string;
  count: number;
  icon: JSX.Element;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

interface JobOpening {
  id: number;
  title: string;
  category: string;
  type: string;
  location: string;
  salary: string;
  experience: string;
  posted: string;
  description: string;
  requirements: string[];
  skills: string[];
  urgent: boolean;
  featured: boolean;
}

interface Benefit {
  title: string;
  description: string;
  icon: JSX.Element;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

interface EmployeeStory {
  name: string;
  role: string;
  tenure: string;
  quote: string;
  image: string;
  achievements: string[];
}

interface ColorMap {
  bg: string;
  text: string;
  border: string;
  hover: string;
  gradient: string;
  solid: string;
}

interface Stat {
  number: string;
  label: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

const CareersPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const jobCategories: JobCategory[] = [
    { id: 'all', label: 'All Roles', count: 24, icon: <FiUsers />, color: 'blue' },
    { id: 'tech', label: 'Technology', count: 12, icon: <FiZap />, color: 'purple' },
    { id: 'sales', label: 'Sales & Marketing', count: 6, icon: <FiDollarSign />, color: 'green' },
    { id: 'operations', label: 'Operations', count: 4, icon: <FiClock />, color: 'orange' },
    { id: 'support', label: 'Customer Support', count: 2, icon: <FiAward />, color: 'blue' }
  ];

  const jobOpenings: JobOpening[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      category: "tech",
      type: "Full-time",
      location: "Remote",
      salary: "$90K - $120K",
      experience: "5+ years",
      posted: "2 days ago",
      description: "Join our core product team to build revolutionary internet solutions using React, TypeScript, and modern web technologies.",
      requirements: ["React/TypeScript", "GraphQL", "Testing", "CI/CD"],
      skills: ["JavaScript", "React", "TypeScript", "Next.js", "Tailwind CSS"],
      urgent: true,
      featured: true
    },
    {
      id: 2,
      title: "Network Engineer",
      category: "tech",
      type: "Full-time",
      location: "Lagos, Nigeria",
      salary: "$70K - $95K",
      experience: "3+ years",
      posted: "1 week ago",
      description: "Design and maintain our cutting-edge fiber and wireless network infrastructure across Africa.",
      requirements: ["CCNA/CCNP", "Network Security", "Troubleshooting"],
      skills: ["Cisco", "Juniper", "Network Security", "Linux"],
      urgent: false,
      featured: true
    },
    {
      id: 3,
      title: "Sales Manager",
      category: "sales",
      type: "Full-time",
      location: "Remote",
      salary: "$80K + Commission",
      experience: "4+ years",
      posted: "3 days ago",
      description: "Lead our sales team to expand Rexifi's market presence and drive customer acquisition.",
      requirements: ["B2B Sales", "Team Management", "CRM"],
      skills: ["Sales", "Leadership", "CRM", "Communication"],
      urgent: true,
      featured: false
    },
    {
      id: 4,
      title: "Customer Support Specialist",
      category: "support",
      type: "Full-time",
      location: "Remote",
      salary: "$45K - $60K",
      experience: "2+ years",
      posted: "1 week ago",
      description: "Provide exceptional support to our customers and help them get the most from our services.",
      requirements: ["Customer Service", "Technical Support", "Communication"],
      skills: ["Support", "Communication", "Problem Solving"],
      urgent: false,
      featured: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      category: "tech",
      type: "Full-time",
      location: "Remote",
      salary: "$100K - $130K",
      experience: "4+ years",
      posted: "Just now",
      description: "Build and scale our cloud infrastructure to support millions of users across Africa.",
      requirements: ["AWS/Azure", "Kubernetes", "Terraform"],
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      urgent: true,
      featured: true
    }
  ];

  const benefits: Benefit[] = [
    {
      title: "Competitive Compensation",
      description: "Industry-leading salaries with performance bonuses and stock options",
      icon: <FiDollarSign className="w-8 h-8" />,
      color: "green"
    },
    {
      title: "Remote First Culture",
      description: "Work from anywhere in Africa with flexible hours and results-oriented approach",
      icon: <FiMapPin className="w-8 h-8" />,
      color: "blue"
    },
    {
      title: "Career Growth",
      description: "Clear progression paths, mentorship programs, and continuous learning opportunities",
      icon: <FiAward className="w-8 h-8" />,
      color: "purple"
    },
    {
      title: "Cutting-Edge Technology",
      description: "Work with the latest tech stack and solve challenging problems at scale",
      icon: <FiZap className="w-8 h-8" />,
      color: "orange"
    }
  ];

  const employeeStories: EmployeeStory[] = [
    {
      name: "Bright Iweobi O.",
      role: "Lead Frontend Developer",
      tenure: "2 years",
      quote: "Rexifi gave me the opportunity to work on projects that impact millions of users across Africa.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      achievements: ["Led team of 8 developers", "Shipped 3 major features", "Mentored 5 junior engineers"]
    },
    {
      name: "Mr. Onyinye",
      role: "Network Operations Manager",
      tenure: "3 years",
      quote: "The growth I've experienced here is incredible. From engineer to manager in 18 months!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      achievements: ["Expanded network to 10 new cities", "Improved uptime to 99.9%", "Led 15-person team"]
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

  const filteredJobs = jobOpenings.filter(job => 
    activeCategory === 'all' || job.category === activeCategory
  );

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

  const stats: Stat[] = [
    { number: "50+", label: "Team Members", color: "blue" },
    { number: "15", label: "Countries", color: "purple" },
    { number: "98%", label: "Employee Satisfaction", color: "green" },
    { number: "24", label: "Open Roles", color: "orange" }
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.span
                variants={itemVariants}
                className="inline-block rounded-full bg-gray-800/50 px-6 py-3 text-sm text-gray-300 mb-6 border border-gray-700/50"
              >
                🚀 JOIN OUR MISSION
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Build The Future of
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">African Connectivity</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Help us bridge the digital divide and bring high-speed internet to every corner of Africa. 
                Your work will impact millions of lives.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button 
                  onClick={() => {
                    const element = document.getElementById('open-positions');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  View Open Positions
                  <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <FiPlay className="w-5 h-5 ml-1" />
                  </div>
                  Watch Our Story
                </button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
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

        {/* Benefits Section */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Join</span> Rexifi?
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                We invest in our team's growth and well-being with industry-leading benefits and a supportive culture.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${colorMap[benefit.color].border} transition-all duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorMap[benefit.color].bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={colorMap[benefit.color].text}>
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section id="open-positions" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Open <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Positions</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Find your perfect role and help us shape the future of internet connectivity in Africa.
              </motion.p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {jobCategories.map((category) => (
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
                  {category.icon}
                  {category.label}
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
                  placeholder="Search positions by title, skill, or location..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </motion.div>

            {/* Jobs Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <AnimatePresence>
                {filteredJobs.map((job) => {
                  const categoryColor = jobCategories.find(c => c.id === job.category)?.color || 'blue';
                  return (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setSelectedJob(job)}
                      className={`group p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 cursor-pointer transition-all duration-300 ${
                        selectedJob?.id === job.id 
                          ? `${colorMap[categoryColor].border} border-2 shadow-2xl` 
                          : 'border-gray-700 hover:border-gray-600'
                      } ${job.featured ? 'ring-2 ring-yellow-400/20' : ''}`}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-gray-400">{job.type}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-sm text-gray-400 flex items-center">
                              <FiMapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                        {job.urgent && (
                          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                            🔥 Urgent
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <FiDollarSign className="w-4 h-4 text-green-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <FiClock className="w-4 h-4 text-blue-400" />
                          {job.experience}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-xs">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="px-3 py-1 bg-white/5 rounded-full text-gray-400 text-xs">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{job.posted}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                            setIsApplicationOpen(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          Apply Now →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Employee Stories */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Life at <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Rexifi</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                Hear from our team members about their journey and experiences building Africa's connectivity future.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {employeeStories.map((story, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{story.name}</h3>
                      <p className="text-gray-400">{story.role} • {story.tenure}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 italic mb-4">"{story.quote}"</p>
                  
                  <div className="space-y-2">
                    {story.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <FiStar className="w-4 h-4 text-yellow-400" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Modal */}
        <AnimatePresence>
          {isApplicationOpen && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsApplicationOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal content would go here */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RexifiFooter />
    </>
  );
};

export default CareersPage;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiHeart, FiZap, FiUsers } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

// Define TypeScript interfaces
interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  video?: string;
  text: string;
  highlights: string[];
  joined: string;
  usage: string;
}

interface Category {
  id: string;
  label: string;
  count: number;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ReactElement;
  color: string;
}

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

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

  const categories: Category[] = [
    { id: 'all', label: 'All Reviews', count: 28, color: 'blue' },
    { id: 'speed', label: 'Internet Speed', count: 12, color: 'green' },
    { id: 'reliability', label: 'Reliability', count: 8, color: 'purple' },
    { id: 'support', label: 'Customer Support', count: 6, color: 'orange' },
    { id: 'installation', label: 'Installation', count: 2, color: 'blue' }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Developer",
      location: "Lagos, Nigeria",
      rating: 5,
      category: "speed",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      video: "https://example.com/video1.mp4",
      text: "Rexifi transformed my work-from-home experience. The fiber connection is incredibly stable, and I've had zero downtime in 6 months. Downloading large files that used to take hours now takes minutes!",
      highlights: ["1Gbps speed", "Zero downtime", "24/7 reliability"],
      joined: "March 2023",
      usage: "Remote work & streaming"
    },
    {
      id: 2,
      name: "Kwame Osei",
      role: "Small Business Owner",
      location: "Accra, Ghana",
      rating: 5,
      category: "reliability",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      text: "As a business owner, I can't afford internet downtime. Rexifi's enterprise solution has been rock-solid. Their support team is always available and incredibly helpful.",
      highlights: ["99.9% uptime", "Business-grade", "Quick support"],
      joined: "January 2023",
      usage: "E-commerce & video conferencing"
    },
    {
      id: 3,
      name: "Amina Bello",
      role: "University Student",
      location: "Abuja, Nigeria",
      rating: 4,
      category: "support",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      text: "The installation team was professional and fast. When I had an issue with my WiFi, support walked me through the solution in under 10 minutes. Great service!",
      highlights: ["Fast installation", "Helpful support", "Affordable"],
      joined: "August 2023",
      usage: "Online learning & research"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Gaming Enthusiast",
      location: "Nairobi, Kenya",
      rating: 5,
      category: "speed",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      text: "Finally, an internet provider that understands gamers! Low latency, high speeds, and no data caps. My gaming experience has never been better.",
      highlights: ["Low latency", "No data caps", "Gaming optimized"],
      joined: "May 2023",
      usage: "Online gaming & streaming"
    },
    {
      id: 5,
      name: "Grace Williams",
      role: "Content Creator",
      location: "Cape Town, South Africa",
      rating: 5,
      category: "installation",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      text: "Uploading 4K videos used to be a nightmare. With Rexifi's symmetrical fiber, I can upload hours of content in minutes. Life-changing for my YouTube channel!",
      highlights: ["Symmetrical speeds", "4K streaming", "Fast uploads"],
      joined: "February 2023",
      usage: "Content creation & live streaming"
    },
    {
      id: 6,
      name: "Michael Adebayo",
      role: "Family Man",
      location: "Ibadan, Nigeria",
      rating: 5,
      category: "reliability",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      text: "With 4 kids streaming, gaming, and attending online classes simultaneously, Rexifi handles it all without a hitch. Truly family-proof internet!",
      highlights: ["Multiple devices", "Family-friendly", "Consistent speeds"],
      joined: "November 2022",
      usage: "Family entertainment & education"
    }
  ];

  const stats: Stat[] = [
    { number: "4.9/5", label: "Average Rating", icon: <FiStar className="w-6 h-6" />, color: "orange" },
    { number: "500+", label: "Happy Customers", icon: <FiUsers className="w-6 h-6" />, color: "blue" },
    { number: "98%", label: "Would Recommend", icon: <FiHeart className="w-6 h-6" />, color: "purple" },
    { number: "24/7", label: "Support Rating", icon: <FiZap className="w-6 h-6" />, color: "green" }
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, filteredTestimonials.length]);

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const stars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ));
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
                ⭐ CUSTOMER STORIES
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent"
              >
                Hear From Our
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Happy Customers</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Discover why thousands of customers across Africa trust Rexifi for their 
                internet connectivity needs. Real stories from real people.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.number}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[stat.color as keyof typeof colorMap].bg} mb-3`}>
                    <div className={colorMap[stat.color as keyof typeof colorMap].text}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-2xl md:text-3xl font-bold ${colorMap[stat.color as keyof typeof colorMap].text} mb-1`}>{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Slider Section */}
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
                Real Stories, <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Real Results</span>
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Hear directly from our customers about their experience with Rexifi's internet services
              </motion.p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentSlide(0);
                  }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? `${colorMap[category.color as keyof typeof colorMap].solid} text-white shadow-lg`
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
                  {filteredTestimonials.map((_, index: number) => (
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
                <AnimatePresence mode="wait" custom={currentSlide}>
                  <motion.div
                    key={currentSlide}
                    custom={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 p-8"
                  >
                    {filteredTestimonials.length > 0 && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                        {/* Testimonial Content */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={filteredTestimonials[currentSlide].image}
                              alt={filteredTestimonials[currentSlide].name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/20"
                            />
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {filteredTestimonials[currentSlide].name}
                              </h3>
                              <p className="text-gray-400">
                                {filteredTestimonials[currentSlide].role} • {filteredTestimonials[currentSlide].location}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                {stars(filteredTestimonials[currentSlide].rating)}
                              </div>
                            </div>
                          </div>

                          <div className="relative">
                            <p className="text-lg text-gray-300 leading-relaxed relative z-10">
                              "{filteredTestimonials[currentSlide].text}"
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {filteredTestimonials[currentSlide].highlights.map((highlight: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Joined {filteredTestimonials[currentSlide].joined}</span>
                            <span>{filteredTestimonials[currentSlide].usage}</span>
                          </div>
                        </div>

                        {/* Visual Element */}
                        <div className="hidden lg:flex items-center justify-center">
                          <div className="relative">
                            <div className="w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center">
                              <div className="w-48 h-48 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full flex items-center justify-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center">
                                  {/* Visual element */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Testimonials Section */}
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
                More <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Happy Customers</span>
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {stars(testimonial.rating)}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{testimonial.location}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      colorMap[categories.find(c => c.id === testimonial.category)?.color as keyof typeof colorMap || 'blue'].bg
                    } ${colorMap[categories.find(c => c.id === testimonial.category)?.color as keyof typeof colorMap || 'blue'].text}`}>
                      {categories.find(c => c.id === testimonial.category)?.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <motion.h2 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Ready to Join Our <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Happy Family</span>?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Experience the Rexifi difference and become our next success story
              </motion.p>
              <motion.div 
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  Get Started Today
                </button>
                <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-white hover:text-white">
                  View Internet Plans
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonial Detail Modal */}
        <AnimatePresence>
          {selectedTestimonial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTestimonial(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={selectedTestimonial.image}
                      alt={selectedTestimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/20"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedTestimonial.name}</h3>
                      <p className="text-gray-400">{selectedTestimonial.role} • {selectedTestimonial.location}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {stars(selectedTestimonial.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    "{selectedTestimonial.text}"
                  </p>
                  
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
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

export default Testimonials;
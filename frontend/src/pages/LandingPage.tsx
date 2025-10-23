// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiArrowRight, 
//   FiPlay, 
//   FiStar, 
//   FiChevronLeft, 
//   FiChevronRight,
//   FiCheck,
//   FiTrendingUp,
//   FiUsers,
//   FiTarget,
//   FiBarChart2,
//   FiMessageCircle,
//   FiMail,
//   FiPhone,
//   FiMapPin
// } from 'react-icons/fi';

// // Particle Background Component
// const ParticleBackground = () => {
//   return (
//     <div className="absolute inset-0 opacity-10">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
//     </div>
//   );
// };

// // Floating Elements for Background
// const FloatingShapes = () => {
//   return (
//     <>
//       <motion.div
//         animate={{
//           y: [0, -20, 0],
//           rotate: [0, 5, 0],
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//         className="absolute top-1/4 left-10 w-6 h-6 bg-blue-500/20 rounded-full"
//       />
//       <motion.div
//         animate={{
//           y: [0, 30, 0],
//           rotate: [0, -8, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1
//         }}
//         className="absolute top-1/3 right-20 w-8 h-8 bg-purple-500/20 rounded-lg"
//       />
//       <motion.div
//         animate={{
//           y: [0, -15, 0],
//           rotate: [0, 10, 0],
//         }}
//         transition={{
//           duration: 7,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2
//         }}
//         className="absolute bottom-1/4 left-20 w-10 h-10 bg-pink-500/20 rounded-full"
//       />
//     </>
//   );
// };

// const LandingPage = () => {
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [activeWork, setActiveWork] = useState(0);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });

//   // Testimonials Data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       company: "TechFlow Inc",
//       role: "Marketing Director",
//       content: "AdVantage transformed our digital presence. Our ROI increased by 300% in just 3 months!",
//       rating: 5,
//       image: "👩‍💼"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       company: "UrbanStyle Fashion",
//       role: "CEO",
//       content: "The strategic approach to our social media campaigns resulted in a 150% growth in engagement.",
//       rating: 5,
//       image: "👨‍💼"
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       company: "FreshBite Restaurants",
//       role: "Brand Manager",
//       content: "Outstanding results! Our conversion rates skyrocketed and customer acquisition costs dropped significantly.",
//       rating: 5,
//       image: "👩‍🍳"
//     }
//   ];

//   // Portfolio Works
//   const portfolioWorks = [
//     {
//       id: 1,
//       title: "E-commerce Revolution",
//       client: "StyleHub",
//       category: "Social Media & PPC",
//       results: "450% ROAS, 200% revenue growth",
//       image: "🛍️",
//       description: "Complete digital transformation for fashion e-commerce brand"
//     },
//     {
//       id: 2,
//       title: "SaaS Launch Success",
//       client: "CloudTech Solutions",
//       category: "Content Marketing & SEO",
//       results: "3000+ signups in first month",
//       image: "☁️",
//       description: "Strategic launch campaign for B2B SaaS platform"
//     },
//     {
//       id: 3,
//       title: "Local Business Expansion",
//       client: "Urban Coffee Co.",
//       category: "Local SEO & Google Ads",
//       results: "150% increase in foot traffic",
//       image: "☕",
//       description: "Hyper-local targeting strategy for coffee chain expansion"
//     },
//     {
//       id: 4,
//       title: "Brand Awareness Campaign",
//       client: "EcoLife Products",
//       category: "Influencer Marketing",
//       results: "2M+ impressions, 50K engagements",
//       image: "🌿",
//       description: "Sustainable product launch with eco-conscious influencers"
//     }
//   ];

//   // Services
//   const services = [
//     {
//       icon: FiTarget,
//       title: "PPC Advertising",
//       description: "Maximize ROI with data-driven paid advertising campaigns across all platforms.",
//       features: ["Google Ads", "Facebook/Instagram Ads", "LinkedIn Campaigns", "Retargeting"]
//     },
//     {
//       icon: FiTrendingUp,
//       title: "Social Media Marketing",
//       description: "Build brand presence and engage your audience with compelling social strategies.",
//       features: ["Content Strategy", "Community Management", "Influencer Partnerships", "Analytics"]
//     },
//     {
//       icon: FiBarChart2,
//       title: "SEO & Content Marketing",
//       description: "Dominate search rankings and attract organic traffic with optimized content.",
//       features: ["Keyword Research", "On-page SEO", "Content Creation", "Link Building"]
//     },
//     {
//       icon: FiUsers,
//       title: "Conversion Optimization",
//       description: "Turn visitors into customers with proven conversion rate optimization techniques.",
//       features: ["A/B Testing", "Landing Page Optimization", "Funnel Analysis", "UX Improvements"]
//     }
//   ];

//   // Stats
//   const stats = [
//     { number: "250%", label: "Average ROI Increase" },
//     { number: "500+", label: "Successful Campaigns" },
//     { number: "15M+", label: "Ad Impressions" },
//     { number: "98%", label: "Client Satisfaction" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const nextTestimonial = () => {
//     setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const nextWork = () => {
//     setActiveWork((prev) => (prev + 1) % portfolioWorks.length);
//   };

//   const prevWork = () => {
//     setActiveWork((prev) => (prev - 1 + portfolioWorks.length) % portfolioWorks.length);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Form submitted:', formData);
//     alert('Thank you for your message! We\'ll get back to you soon.');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const StatCard = ({ number, label, index }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="text-center"
//     >
//       <motion.div
//         initial={{ scale: 0 }}
//         whileInView={{ scale: 1 }}
//         transition={{ duration: 0.5, delay: index * 0.2 }}
//         className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
//       >
//         {number}
//       </motion.div>
//       <p className="text-gray-600 dark:text-gray-300 font-medium">{label}</p>
//     </motion.div>
//   );

//   const ServiceCard = ({ service, index }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       whileHover={{ y: -10, scale: 1.02 }}
//       className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
//     >
//       <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
//         <service.icon className="w-6 h-6 text-white" />
//       </div>
//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
//       <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
//       <ul className="space-y-2">
//         {service.features.map((feature, idx) => (
//           <li key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//             <FiCheck className="w-4 h-4 text-green-500" />
//             {feature}
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white overflow-hidden">
//       <ParticleBackground />
//       <FloatingShapes />

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="mb-8"
//           >
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Transform Your
//               <span className="block">Digital Presence</span>
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
//               We craft data-driven advertising strategies that drive real results and maximize your ROI.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
//             >
//               Get Free Strategy Session
//               <FiArrowRight className="w-5 h-5" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg flex items-center gap-2 hover:border-blue-500 transition-colors"
//             >
//               <FiPlay className="w-5 h-5" />
//               Watch Case Study
//             </motion.button>
//           </motion.div>

//           {/* Stats Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
//           >
//             {stats.map((stat, index) => (
//               <StatCard key={index} number={stat.number} label={stat.label} index={index} />
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Comprehensive digital marketing solutions tailored to your business goals
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {services.map((service, index) => (
//               <ServiceCard key={index} service={service} index={index} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Portfolio Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               See how we've helped businesses achieve remarkable growth
//             </p>
//           </motion.div>

//           <div className="relative">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeWork}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 md:p-12"
//               >
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                   <div>
//                     <div className="text-6xl mb-4">{portfolioWorks[activeWork].image}</div>
//                     <h3 className="text-2xl md:text-3xl font-bold mb-4">{portfolioWorks[activeWork].title}</h3>
//                     <p className="text-gray-600 dark:text-gray-300 mb-4">{portfolioWorks[activeWork].description}</p>
//                     <div className="space-y-2">
//                       <p className="font-semibold">Client: {portfolioWorks[activeWork].client}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Category: {portfolioWorks[activeWork].category}</p>
//                       <p className="text-green-600 dark:text-green-400 font-bold">Results: {portfolioWorks[activeWork].results}</p>
//                     </div>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
//                     <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-500 rounded-xl flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-4xl mb-2">📊</div>
//                         <p className="text-gray-500 dark:text-gray-400">Campaign Analytics</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             <div className="flex justify-center gap-4 mt-8">
//               <button
//                 onClick={prevWork}
//                 className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
//               >
//                 <FiChevronLeft className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={nextWork}
//                 className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
//               >
//                 <FiChevronRight className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Love</h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Don't just take our word for it - hear from our satisfied clients
//             </p>
//           </motion.div>

//           <div className="relative max-w-4xl mx-auto">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTestimonial}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 1.1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl"
//               >
//                 <div className="flex items-start gap-6">
//                   <div className="text-4xl">{testimonials[activeTestimonial].image}</div>
//                   <div className="flex-1">
//                     <div className="flex gap-1 mb-4">
//                       {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
//                         <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                       ))}
//                     </div>
//                     <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 italic">
//                       "{testimonials[activeTestimonial].content}"
//                     </p>
//                     <div>
//                       <p className="font-bold text-lg">{testimonials[activeTestimonial].name}</p>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             <div className="flex justify-center gap-4 mt-8">
//               <button
//                 onClick={prevTestimonial}
//                 className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
//               >
//                 <FiChevronLeft className="w-6 h-6" />
//               </button>
//               <div className="flex items-center gap-2">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveTestimonial(index)}
//                     className={`w-3 h-3 rounded-full transition-all ${
//                       index === activeTestimonial ? 'bg-blue-600 w-6' : 'bg-gray-300 dark:bg-gray-600'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <button
//                 onClick={nextTestimonial}
//                 className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
//               >
//                 <FiChevronRight className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Ready to Skyrocket Your Growth?
//             </h2>
//             <p className="text-xl text-blue-100 mb-8">
//               Schedule your free strategy session and discover how we can transform your digital presence
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all"
//             >
//               Book Free Consultation
//               <FiArrowRight className="w-5 h-5" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4">AdVantage</h3>
//               <p className="text-gray-400">
//                 Transforming businesses through data-driven digital marketing strategies.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Services</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>PPC Advertising</li>
//                 <li>Social Media Marketing</li>
//                 <li>SEO & Content</li>
//                 <li>Conversion Optimization</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Contact</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="flex items-center gap-2">
//                   <FiMail className="w-4 h-4" />
//                   hello@advantage.com
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiPhone className="w-4 h-4" />
//                   +1 (555) 123-4567
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiMapPin className="w-4 h-4" />
//                   New York, NY
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Follow Us</h4>
//               <div className="flex gap-4">
//                 {/* Social media links would go here */}
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 AdVantage Marketing. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

































import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiPlay, 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight,
  FiCheck,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiBarChart2,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

// Interactive Particle Background Component
const InteractiveParticleBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
          originalSize: Math.random() * 2 + 0.5
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = particle.x - mousePosition.x;
        const dy = particle.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x += dx * force * 0.02;
          particle.y += dy * force * 0.02;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #030712 0%, #111827 50%, #1e1b4b 100%)' }}
    />
  );
};

// Animated Floating Elements
const AnimatedFloatingElements = () => {
  return (
    <>
      {/* Large floating orbs */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 rounded-full blur-3xl"
      />
      
      {/* Animated grid pattern */}
      <div className="fixed inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center'
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30 + Math.random() * 60, 0],
            x: [0, -20 + Math.random() * 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
          className={`fixed w-2 h-2 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full ${
            i % 4 === 0 ? 'blur-sm' : i % 4 === 1 ? 'blur' : 'blur-xs'
          }`}
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${15 + (i * 6)}%`,
          }}
        />
      ))}
    </>
  );
};

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeWork, setActiveWork] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechFlow Inc",
      role: "Marketing Director",
      content: "AdVantage transformed our digital presence. Our ROI increased by 300% in just 3 months!",
      rating: 5,
      image: "👩‍💼"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "UrbanStyle Fashion",
      role: "CEO",
      content: "The strategic approach to our social media campaigns resulted in a 150% growth in engagement.",
      rating: 5,
      image: "👨‍💼"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "FreshBite Restaurants",
      role: "Brand Manager",
      content: "Outstanding results! Our conversion rates skyrocketed and customer acquisition costs dropped significantly.",
      rating: 5,
      image: "👩‍🍳"
    }
  ];

  // Portfolio Works
  const portfolioWorks = [
    {
      id: 1,
      title: "E-commerce Revolution",
      client: "StyleHub",
      category: "Social Media & PPC",
      results: "450% ROAS, 200% revenue growth",
      image: "🛍️",
      description: "Complete digital transformation for fashion e-commerce brand"
    },
    {
      id: 2,
      title: "SaaS Launch Success",
      client: "CloudTech Solutions",
      category: "Content Marketing & SEO",
      results: "3000+ signups in first month",
      image: "☁️",
      description: "Strategic launch campaign for B2B SaaS platform"
    },
    {
      id: 3,
      title: "Local Business Expansion",
      client: "Urban Coffee Co.",
      category: "Local SEO & Google Ads",
      results: "150% increase in foot traffic",
      image: "☕",
      description: "Hyper-local targeting strategy for coffee chain expansion"
    },
    {
      id: 4,
      title: "Brand Awareness Campaign",
      client: "EcoLife Products",
      category: "Influencer Marketing",
      results: "2M+ impressions, 50K engagements",
      image: "🌿",
      description: "Sustainable product launch with eco-conscious influencers"
    }
  ];

  // Services
  const services = [
    {
      icon: FiTarget,
      title: "PPC Advertising",
      description: "Maximize ROI with data-driven paid advertising campaigns across all platforms.",
      features: ["Google Ads", "Facebook/Instagram Ads", "LinkedIn Campaigns", "Retargeting"]
    },
    {
      icon: FiTrendingUp,
      title: "Social Media Marketing",
      description: "Build brand presence and engage your audience with compelling social strategies.",
      features: ["Content Strategy", "Community Management", "Influencer Partnerships", "Analytics"]
    },
    {
      icon: FiBarChart2,
      title: "SEO & Content Marketing",
      description: "Dominate search rankings and attract organic traffic with optimized content.",
      features: ["Keyword Research", "On-page SEO", "Content Creation", "Link Building"]
    },
    {
      icon: FiUsers,
      title: "Conversion Optimization",
      description: "Turn visitors into customers with proven conversion rate optimization techniques.",
      features: ["A/B Testing", "Landing Page Optimization", "Funnel Analysis", "UX Improvements"]
    }
  ];

  // Stats
  const stats = [
    { number: "250%", label: "Average ROI Increase" },
    { number: "500+", label: "Successful Campaigns" },
    { number: "15M+", label: "Ad Impressions" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextWork = () => {
    setActiveWork((prev) => (prev + 1) % portfolioWorks.length);
  };

  const prevWork = () => {
    setActiveWork((prev) => (prev - 1 + portfolioWorks.length) % portfolioWorks.length);
  };

  const StatCard = ({ number, label, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
      >
        {number}
      </motion.div>
      <p className="text-gray-400 font-medium">{label}</p>
    </motion.div>
  );

  const ServiceCard = ({ service, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-400 group-hover:to-purple-400 transition-all"
      >
        <service.icon className="w-6 h-6 text-white" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400 mb-4">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
            <FiCheck className="w-4 h-4 text-green-400" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 text-white overflow-hidden relative">
      <InteractiveParticleBackground />
      <AnimatedFloatingElements />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Transform Your
                <span className="block">Digital Presence</span>
              </motion.h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                We craft data-driven advertising strategies that drive real results and maximize your ROI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all border border-blue-500/30"
              >
                Get Free Strategy Session
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold text-lg flex items-center gap-2 hover:border-blue-500 transition-colors"
              >
                <FiPlay className="w-5 h-5" />
                Watch Case Study
              </motion.button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <StatCard key={index} number={stat.number} label={stat.label} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comprehensive digital marketing solutions tailored to your business goals
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                See how we've helped businesses achieve remarkable growth
              </p>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-gray-800/60 to-purple-900/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-700/50"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="text-6xl mb-4">{portfolioWorks[activeWork].image}</div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{portfolioWorks[activeWork].title}</h3>
                      <p className="text-gray-300 mb-4">{portfolioWorks[activeWork].description}</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-white">Client: {portfolioWorks[activeWork].client}</p>
                        <p className="text-sm text-gray-400">Category: {portfolioWorks[activeWork].category}</p>
                        <p className="text-green-400 font-bold">Results: {portfolioWorks[activeWork].results}</p>
                      </div>
                    </div>
                    <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
                      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📊</div>
                          <p className="text-gray-400">Campaign Analytics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevWork}
                  className="p-3 bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all hover:border-blue-500/50"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextWork}
                  className="p-3 bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all hover:border-blue-500/50"
                >
                  <FiChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Client Love
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-xl"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">{testimonials[activeTestimonial].image}</div>
                    <div className="flex-1">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl text-gray-300 mb-6 italic">
                        "{testimonials[activeTestimonial].content}"
                      </p>
                      <div>
                        <p className="font-bold text-lg text-white">{testimonials[activeTestimonial].name}</p>
                        <p className="text-gray-400">
                          {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="p-3 bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all hover:border-blue-500/50"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </motion.button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeTestimonial ? 'bg-blue-500 w-6' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="p-3 bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all hover:border-blue-500/50"
                >
                  <FiChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-t border-b border-gray-700/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Skyrocket Your Growth?
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Schedule your free strategy session and discover how we can transform your digital presence
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all border border-blue-400/30"
              >
                Book Free Consultation
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-700/30 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AdVantage
                </h3>
                <p className="text-gray-400">
                  Transforming businesses through data-driven digital marketing strategies.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>PPC Advertising</li>
                  <li>Social Media Marketing</li>
                  <li>SEO & Content</li>
                  <li>Conversion Optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    hello@advantage.com
                  </li>
                  <li className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    +1 (555) 123-4567
                  </li>
                  <li className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    New York, NY
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {/* Social media links would go here */}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 AdVantage Marketing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
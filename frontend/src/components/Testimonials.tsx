// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// const RexifiTestimonials = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   // Testimonial data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Chen",
//       role: "Software Engineer",
//       company: "TechFlow Inc.",
//       rating: 5,
//       text: "Rexifi transformed our remote work experience. The reliability and speed are unmatched - we've had zero downtime in 6 months!",
//       image: "👩‍💻"
//     },
//     {
//       id: 2,
//       name: "Marcus Johnson",
//       role: "Content Creator",
//       company: "Digital Studios",
//       rating: 5,
//       text: "Uploading 4K videos used to take hours. With Rexifi's fiber connection, it's done in minutes. Game changer for my business!",
//       image: "🎬"
//     },
//     {
//       id: 3,
//       name: "Dr. Emily Rodriguez",
//       role: "Telemedicine Specialist",
//       company: "HealthFirst Clinic",
//       rating: 5,
//       text: "Crystal clear video consultations with patients, even in rural areas. Rexifi's consistent performance is crucial for our practice.",
//       image: "👩‍⚕️"
//     },
//     {
//       id: 4,
//       name: "James Wilson",
//       role: "Gaming Studio Director",
//       company: "NextGen Games",
//       rating: 5,
//       text: "Latency-sensitive gaming and large file transfers happen seamlessly. Our team's productivity has increased by 40%.",
//       image: "🎮"
//     }
//   ];

//   // Rexifi brand colors
//   const colors = {
//     primary: '#0066FF', // Rexifi blue
//     secondary: '#00D4AA', // Teal accent
//     dark: '#1A1F36',
//     light: '#F8FAFC',
//     gray: '#64748B'
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Star rating component
//   const StarRating = ({ rating }) => (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: i * 0.1 }}
//         >
//           <Star
//             size={16}
//             className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//           />
//         </motion.div>
//       ))}
//     </div>
//   );

//   return (
//     <section className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
      
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             What Our <span className="text-blue-600">Customers Say</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Join thousands of satisfied customers experiencing the future of internet connectivity
//           </p>
//         </motion.div>

//         {/* Main Slider Container */}
//         <div className="relative">
//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200 group"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
//           </button>
          
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200 group"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
//           </button>

//           {/* Slider */}
//           <div ref={sliderRef} className="relative h-96">
//             <AnimatePresence mode="wait">
//               {testimonials.map((testimonial, index) => (
//                 index === currentSlide && (
//                   <motion.div
//                     key={testimonial.id}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.5, ease: "easeInOut" }}
//                     className="absolute inset-0"
//                   >
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                       {/* Testimonial Card */}
//                       <motion.div
//                         className="bg-white rounded-2xl shadow-xl p-8 relative"
//                         whileHover={{ y: -5 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                       >
//                         {/* Quote Icon */}
//                         <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                           <Quote className="w-6 h-6 text-white" />
//                         </div>
                        
//                         {/* Rating */}
//                         <div className="mb-4">
//                           <StarRating rating={testimonial.rating} />
//                         </div>
                        
//                         {/* Testimonial Text */}
//                         <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
//                           "{testimonial.text}"
//                         </blockquote>
                        
//                         {/* Author Info */}
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-2xl">
//                             {testimonial.image}
//                           </div>
//                           <div>
//                             <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                             <div className="text-gray-600 text-sm">{testimonial.role}</div>
//                             <div className="text-blue-600 text-sm font-medium">{testimonial.company}</div>
//                           </div>
//                         </div>
//                       </motion.div>

//                       {/* Stats Side */}
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.2 }}
//                         className="grid grid-cols-2 gap-6"
//                       >
//                         {[
//                           { number: "99.9%", label: "Uptime Reliability" },
//                           { number: "1M+", label: "Happy Customers" },
//                           { number: "24/7", label: "Support Available" },
//                           { number: "10Gbps", label: "Max Speed" }
//                         ].map((stat, idx) => (
//                           <motion.div
//                             key={idx}
//                             className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <div className="text-2xl font-bold text-blue-600 mb-2">
//                               {stat.number}
//                             </div>
//                             <div className="text-sm text-gray-600 font-medium">
//                               {stat.label}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 )
//               ))}
//             </AnimatePresence>
//           </div>

//           {/* Dots Indicator */}
//           <div className="flex justify-center gap-3 mt-12">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide 
//                     ? 'bg-blue-600 w-8' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="text-center mt-16"
//         >
//           <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white shadow-xl">
//             <h3 className="text-2xl font-bold mb-4">
//               Ready to Experience Rexifi?
//             </h3>
//             <p className="mb-6 opacity-90">
//               Join our community of satisfied customers and transform your internet experience today.
//             </p>
//             <div className="flex gap-4 justify-center">
//               <motion.button
//                 className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Check Availability
//               </motion.button>
//               <motion.button
//                 className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 View Plans
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default RexifiTestimonials;



































import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const RexifiTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechFlow Inc.",
      rating: 5,
      text: "Rexifi transformed our remote work experience. The reliability and speed are unmatched - we've had zero downtime in 6 months!",
      image: "👩‍💻"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Content Creator",
      company: "Digital Studios",
      rating: 5,
      text: "Uploading 4K videos used to take hours. With Rexifi's fiber connection, it's done in minutes. Game changer for my business!",
      image: "🎬"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Telemedicine Specialist",
      company: "HealthFirst Clinic",
      rating: 5,
      text: "Crystal clear video consultations with patients, even in rural areas. Rexifi's consistent performance is crucial for our practice.",
      image: "👩‍⚕️"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Gaming Studio Director",
      company: "NextGen Games",
      rating: 5,
      text: "Latency-sensitive gaming and large file transfers happen seamlessly. Our team's productivity has increased by 40%.",
      image: "🎮"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Star rating component
  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Star
            size={16}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 overflow-hidden">
      {/* Background Elements matching Benefits section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-cyan-400">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers experiencing the future of internet connectivity
          </p>
        </motion.div>

        {/* Main Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-cyan-400" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-cyan-400" />
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="relative h-96">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === currentSlide && (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Testimonial Card */}
                      <motion.div
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 relative border border-white/20 shadow-2xl"
                        whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.3)' }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Quote Icon */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Rating */}
                        <div className="mb-4">
                          <StarRating rating={testimonial.rating} />
                        </div>
                        
                        {/* Testimonial Text */}
                        <blockquote className="text-lg text-gray-200 mb-6 leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>
                        
                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                            {testimonial.image}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{testimonial.name}</div>
                            <div className="text-gray-300 text-sm">{testimonial.role}</div>
                            <div className="text-cyan-400 text-sm font-medium">{testimonial.company}</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Stats Side */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-6"
                      >
                        {[
                          { number: "99.9%", label: "Uptime Reliability" },
                          { number: "1M+", label: "Happy Customers" },
                          { number: "24/7", label: "Support Available" },
                          { number: "10Gbps", label: "Max Speed" }
                        ].map((stat, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 shadow-lg"
                            whileHover={{ 
                              scale: 1.05,
                              borderColor: 'rgba(34, 211, 238, 0.3)',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-2xl font-bold text-cyan-400 mb-2">
                              {stat.number}
                            </div>
                            <div className="text-sm text-gray-300 font-medium">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-cyan-400 w-8 shadow-lg shadow-cyan-400/25' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-32 md:mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience Rexifi?
            </h3>
            <p className="mb-6 text-gray-200">
              Join our community of satisfied customers and transform your internet experience today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Check Availability
              </motion.button>
              <motion.button
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Plans
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RexifiTestimonials;
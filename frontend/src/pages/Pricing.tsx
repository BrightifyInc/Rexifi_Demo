// import { useState } from 'react';
// import Navbar from "../components/Navbar.js";
// import InstallationFeesSection from "../components/InstallationPrice.js";
// import RexifiFooter from '../components/Footer.js';
// import { motion } from 'framer-motion';
// import FreeSurveyModal from '../components/FreeSurveyModal.js';

// const Pricing = () => {
//   const CTA = () => {
//     const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  
//     const containerVariants = {
//       hidden: { opacity: 0 },
//       visible: {
//         opacity: 1,
//         transition: {
//           staggerChildren: 0.1
//         }
//       }
//     };
  
//     const itemVariants = {
//       hidden: { opacity: 0, y: 50 },
//       visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//           duration: 0.6,
//           ease: "easeOut" as const
//         }
//       }
//     };
  
//     return (
//       <div className="bg-gray-950">
//         <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={containerVariants}
//             >
//               <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 Ready to Transform Your <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Connectivity</span>?
//               </motion.h2>
//               <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Join thousands of satisfied customers who trusted Rexifi for their internet solutions
//               </motion.p>
//               <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <motion.button
//                   onClick={() => setIsSurveyModalOpen(true)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl"
//                 >
//                   Request Your Free Survey
//                 </motion.button>
//                 <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-white hover:text-white">
//                   Contact Sales: 1-800-REXIFI
//                 </button>
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>
  
//         {/* Modal Component */}
//         <FreeSurveyModal 
//           isOpen={isSurveyModalOpen} 
//           onClose={() => setIsSurveyModalOpen(false)} 
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="relative">
//       <Navbar />
//       <InstallationFeesSection />
//       <CTA />
//       <RexifiFooter />
//     </div>
//   )
// }

// export default Pricing;

import { useState } from 'react';
import Navbar from "../components/Navbar.js";
import InstallationFeesSection from "../components/InstallationPrice.js";
import RexifiFooter from '../components/Footer.js';
import { motion } from 'framer-motion';
import FreeSurveyModal from '../components/FreeSurveyModal.js';

const Pricing = () => {
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
          ease: [0.25, 0.46, 0.45, 0.94] // Cubic bezier equivalent of "easeOut"
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
              <motion.h2 
                variants={itemVariants} 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Ready to Transform Your <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Connectivity</span>?
              </motion.h2>
              <motion.p 
                variants={itemVariants} 
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of satisfied customers who trusted Rexifi for their internet solutions
              </motion.p>
              <motion.div 
                variants={itemVariants} 
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  onClick={() => setIsSurveyModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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

  return (
    <div className="relative">
      <Navbar />
      <InstallationFeesSection />
      <CTA />
      <RexifiFooter />
    </div>
  )
}

export default Pricing;
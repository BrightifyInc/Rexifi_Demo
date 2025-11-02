import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiArrowUp,
  FiSend,
  FiMessageCircle,
  FiArrowRight
} from 'react-icons/fi';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../assets/utils";
import { Link } from 'react-router-dom';
import * as THREE from 'three'; // Import THREE

import logo from "../assets/img/logo.png";

// Define types for the points
interface PointData {
  idx: number;
  position: [number, number, number];
  color: string;
}

// Define props for Point component
interface PointProps {
  position: [number, number, number];
  color: string;
}

const ParticleRing = () => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        className="absolute inset-0"
      >
        <OrbitControls maxDistance={20} minDistance={10} enableZoom={false} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={ref}>
      {pointsInner.map((point: PointData) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point: PointData) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }: PointProps) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

const RexifiFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Quick links data
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About Us', href: '#about' },
    { name: 'Support', href: '#support' },
  ];

  const services = [
    'Fiber Internet',
    'Business Solutions',
    'Cloud Services',
    'Network Security',
    'Smart Home Setup'
  ];

  const socialLinks = [
    { icon: FiFacebook, href: '#', color: 'hover:text-blue-400' },
    { icon: FiTwitter, href: '#', color: 'hover:text-cyan-400' },
    { icon: FiInstagram, href: '#', color: 'hover:text-pink-400' },
    { icon: FiLinkedin, href: '#', color: 'hover:text-blue-600' },
  ];

  return (
    <footer className="relative bg-slate-900 overflow-hidden">
      {/* Particle Ring Background */}
      <div className="absolute inset-0 opacity-20">
        <ParticleRing />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <motion.div
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/" className="text-3xl font-bold text-green-500">
                <img 
                  src={logo} 
                  alt="RNM AUTH" 
                  className="h-16 w-auto"
                />
              </Link>
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering your digital world with lightning-fast, reliable internet connectivity. 
              Experience the future of internet today.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiPhone className="w-4 h-4" />
                <span>1-800-REXIFI</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiMail className="w-4 h-4" />
                <span>support@rexifi.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiMapPin className="w-4 h-4" />
                <span>Nationwide Coverage</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Get the latest updates on new services and exclusive offers.
            </p>
            
            <AnimatePresence>
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400 text-center"
                >
                  🎉 Thank you for subscribing!
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubscribe}
                  className="space-y-3"
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiSend className="w-4 h-4" />
                    Subscribe
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-gray-300 border border-white/20 ${social.color} transition-all`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-400 text-sm">
            © 2025 Rexifi Internet Services. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Cookie Policy
            </motion.a>
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Support Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMessageCircle className="w-5 h-5" />
            Get Support
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default RexifiFooter;
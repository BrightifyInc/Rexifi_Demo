import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { FiAward, FiUsers, FiGlobe, FiStar, FiArrowRight } from "react-icons/fi";

// Define types
interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
  color: 'blue' | 'purple' | 'green' | 'orange';
  link: string;
}

interface ColorMap {
  bg: string;
  text: string;
  border: string;
  hover: string;
  solid?: string;
}

interface InternetPlan {
  speed: string;
  price: string;
  popular: boolean;
  description?: string;
}

interface InternetPlans {
  [key: string]: {
    color: string;
    plans: InternetPlan[];
  };
}

interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
}

interface AnimatedStatProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix?: string;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  delay?: number;
  duration?: number;
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      title: "Fiber and Radio Broadband",
      description: "Our service is completely independent of national telcos. Our fiber optic backbone and access networks ensure your data is secured with enterprise-grade encryption and reliability.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5 12h11m-11 0a1 1 0 01-1-1V9a1 1 0 011-1h11a1 1 0 011 1v2a1 1 0 01-1 1m-11 0a1 1 0 00-1 1v2a1 1 0 001 1h11a1 1 0 001-1v-2a1 1 0 00-1-1m-2-5V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h2m-2 14h2m-6-7h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "blue",
      link: "/broadband"
    },
    {
      title: "SmartTV DNS-BOX",
      description: "Access USA/UK Netflix contents from anywhere. Enjoy more than 2500+ entertainment channels with crystal-clear streaming quality and no geographical restrictions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
        </svg>
      ),
      color: "purple",
      link: "/tv-streaming"
    },
    {
      title: "WiFi-Card Hotspots",
      description: "The most affordable unlimited internet across Africa. Designed for clustered areas, markets, large apartments and multi-dwelling units at disruptive pricing with seamless connectivity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 00-2.67-1.85.996.996 0 01-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
        </svg>
      ),
      color: "green",
      link: "/all-for-mobile"
    }
  ];

  const colorMap: Record<'blue' | 'purple' | 'green' | 'orange', ColorMap> = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      hover: "hover:border-blue-400",
      solid: "bg-blue-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
      hover: "hover:border-purple-400",
      solid: "bg-purple-500"
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      hover: "hover:border-green-400",
      solid: "bg-green-500"
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
      hover: "hover:border-orange-400",
      solid: "bg-orange-500"
    }
  };

  const [activePlanTab, setActivePlanTab] = useState('free');
  
  const internetPlans: InternetPlans = {
    fiber: {
      color: 'blue',
      plans: [
        { speed: '25 Mbps', price: '14,000', popular: false },
        { speed: '30 Mbps', price: '19,000', popular: true },
        { speed: '35 Mbps', price: '24,000', popular: false },
        { speed: '40 Mbps', price: '34,000', popular: false }
      ]
    },
    wireless: {
      color: 'green',
      plans: [
        { speed: '15 Mbps', price: '10,000', popular: false },
        { speed: '20 Mbps', price: '14,000', popular: true },
        { speed: '25 Mbps', price: '18,000', popular: false },
        { speed: '30 Mbps', price: '22,000', popular: false }
      ]
    },
    enterprise: {
      color: 'purple',
      plans: [
        { speed: '50 Mbps', price: '45,000', popular: false },
        { speed: '100 Mbps', price: '75,000', popular: true },
        { speed: '200 Mbps', price: '120,000', popular: false },
      ]
    },
    free: {
      color: 'orange',
      plans: [
        { speed: '5 Mbps', price: 'FREE', popular: false, description: 'Basic browsing' },
        { speed: '8 Mbps', price: 'FREE', popular: true, description: 'Standard streaming' },
        { speed: '10 Mbps', price: 'FREE', popular: false, description: 'Premium experience' }
      ]
    }
  };

  return (
    <>    
      <section className="relative py-24 bg-gray-950 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300 mb-4">
              OUR SERVICES
            </span>
            <h2 className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Revolutionary Internet Solutions
            </h2>
            <p className="my-6 max-w-2xl mx-auto text-center text-gray-400 text-base leading-relaxed md:text-lg md:leading-relaxed">
              Experience the future of connectivity with our cutting-edge internet technologies designed for modern living
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border ${colorMap[service.color].border} ${colorMap[service.color].hover} transition-all duration-300 hover:scale-105`}
              >
                {/* Floating shape */}
                <div className="absolute top-4 right-4 opacity-20">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={colorMap[service.color].text}>
                    <path d="M30 5L55 30L30 55L5 30L30 5Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorMap[service.color].bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={colorMap[service.color].text}>
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    <a href={service.link} className="hover:underline">
                      {service.title}
                    </a>
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* CTA */}
                  <a 
                    href={service.link} 
                    className={`inline-flex items-center text-sm font-medium ${colorMap[service.color].text} group-hover:translate-x-2 transition-transform duration-300`}
                  >
                    Learn more
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-${service.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6">Ready to experience the difference?</p>
            <button className="group relative flex w-fit items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-all duration-300 hover:bg-blue-700 mx-auto">
              EXPLORE ALL SERVICES
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Internet Plans Section */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            High-Speed Internet Plans
          </h2>
          <p className="my-6 max-w-2xl mx-auto text-center text-gray-400 text-base leading-relaxed md:text-lg md:leading-relaxed">
            Choose the perfect internet plan for your needs with our reliable 
            and affordable connectivity solutions
          </p>
        </div>

        <div className="relative container mx-auto px-4">
          <div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(internetPlans).map(([key, plan]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePlanTab(key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activePlanTab === key
                      ? `${colorMap[plan.color as keyof typeof colorMap].solid} text-white shadow-lg`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)} Plans
                </motion.button>
              ))}
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internetPlans[activePlanTab].plans.map((plan, index) => {
                const colorConfig = colorMap[internetPlans[activePlanTab].color as keyof typeof colorMap];
                // Create a solid background color from the border color
                const solidBgColor = colorConfig.border
                  .replace('500/20', '500')
                  .replace('border-', 'bg-');
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border ${colorConfig.border} ${colorConfig.hover} transition-all duration-300 hover:scale-105`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className={`${solidBgColor} text-white text-xs px-3 py-1 rounded-full`}>
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white">
                        {plan.speed}
                      </h3>
                      <div className="flex items-baseline justify-center mt-4">
                        <span className="text-3xl font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.price !== 'FREE' && (
                          <span className="ml-1 text-sm text-gray-400">
                            /month
                          </span>
                        )}
                      </div>
                      {plan.description && (
                        <p className="text-sm text-gray-400 mt-2">
                          {plan.description}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <FiStar className={`w-4 h-4 ${colorConfig.text} mr-2`} />
                        <span className="text-sm text-gray-300">
                          High-speed internet
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FiStar className={`w-4 h-4 ${colorConfig.text} mr-2`} />
                        <span className="text-sm text-gray-300">
                          24/7 support
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FiStar className={`w-4 h-4 ${colorConfig.text} mr-2`} />
                        <span className="text-sm text-gray-300">
                          No data caps
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FiStar className={`w-4 h-4 ${colorConfig.text} mr-2`} />
                        <span className="text-sm text-gray-300">
                          Free installation
                        </span>
                      </li>
                    </ul>

                    <button className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      plan.popular
                        ? `${solidBgColor} text-white hover:opacity-90`
                        : `${colorConfig.bg} ${colorConfig.text} hover:opacity-90`
                    }`}>
                      {plan.price === 'FREE' ? 'Get Started' : 'Subscribe Now'}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Section */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Need help choosing the right plan?
              </h3>
              <p className="text-gray-300 mb-6">
                Our experts are ready to help you find the perfect internet solution
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// CountUp Component with smooth animations
const CountUp: React.FC<CountUpProps> = ({ value, duration = 2, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });
  
  const displayValue = useTransform(spring, (latest) => {
    return Math.floor(latest);
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// AnimatedStat Component
const AnimatedStat: React.FC<AnimatedStatProps> = ({ 
  icon: Icon, 
  value, 
  suffix = "", 
  label, 
  color = "blue", 
  delay = 0,
  duration = 2 
}) => {
  const colorClasses = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
    green: { bg: "bg-green-500/10", text: "text-green-400" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-gray-900/50 rounded-xl p-6 text-center border border-gray-800"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color].bg} mb-4`}>
        <Icon className={`w-8 h-8 ${colorClasses[color].text}`} />
      </div>
      <h3 className="text-4xl font-bold text-white mb-2">
        <CountUp value={value} duration={duration} delay={delay} />{suffix}
      </h3>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <section id="about" className="relative bg-gray-950 text-gray-200 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm mb-4">
              OUR STORY
            </span>
            <h2 className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Connecting Communities with Reliable Internet
            </h2>
            <p className="my-6 max-w-2xl mx-auto text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
              Founded in 2015, Rexifi has been on a mission to bridge the digital divide by providing 
              high-speed, affordable internet to underserved communities across the nation.
            </p>
          </div>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Stat 1 - Happy Customers */}
            <AnimatedStat 
              icon={FiUsers}
              value={250000}
              suffix="+"
              label="Happy Customers"
              color="blue"
              delay={0}
              duration={3}
            />
  
            {/* Stat 2 - Cities Coverage */}
            <AnimatedStat 
              icon={FiGlobe}
              value={45}
              suffix="+"
              label="Cities Covered"
              color="green"
              delay={0.1}
              duration={2.5}
            />
  
            {/* Stat 3 - Uptime Guarantee */}
            <AnimatedStat 
              icon={FiAward}
              value={98}
              suffix="%"
              label="Uptime Guarantee"
              color="purple"
              delay={0.2}
              duration={2}
            />
  
            {/* Stat 4 - Rating */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-gray-800"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-4">
                <FiStar className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">
                <CountUp value={4.8} duration={2} delay={0.3} />
                <span className="text-2xl">/5</span>
              </h3>
              <div className="flex justify-center items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-400">Customer Rating</p>
            </motion.div>
          </div>
  
          {/* Company Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Our Commitment to Excellence</h3>
              <p className="text-gray-400 mb-4">
                At Rexifi, we believe that reliable internet access is a necessity, not a luxury. 
                Our team of dedicated engineers and customer service professionals work tirelessly 
                to ensure that our network remains fast, stable, and secure.
              </p>
              <p className="text-gray-400 mb-4">
                We've invested over $200 million in infrastructure development, bringing fiber-optic 
                technology to neighborhoods that traditional providers have overlooked. Our commitment 
                to net neutrality and privacy means we'll never throttle your connection or sell your data.
              </p>
              <p className="text-gray-400">
                Recognized as the "Fastest Growing ISP" by Broadband Now for three consecutive years, 
                we're just getting started on our mission to connect everyone to the opportunities 
                of the digital world.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-8 border border-gray-800"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Industry Recognition</h3>
              
              {/* Award 1 */}
              <div className="flex items-start mb-6">
                <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                  <FiAward className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Best Regional ISP 2023</h4>
                  <p className="text-gray-400 text-sm">Broadband Now Awards</p>
                </div>
              </div>
              
              {/* Award 2 */}
              <div className="flex items-start mb-6">
                <div className="bg-green-500/10 p-3 rounded-lg mr-4">
                  <FiAward className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Customer Satisfaction Excellence</h4>
                  <p className="text-gray-400 text-sm">J.D. Power 2022</p>
                </div>
              </div>
              
              {/* Award 3 */}
              <div className="flex items-start">
                <div className="bg-purple-500/10 p-3 rounded-lg mr-4">
                  <FiAward className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Top Workplace 2023</h4>
                  <p className="text-gray-400 text-sm">Tech Industry Review</p>
                </div>
              </div>
            </motion.div>
          </div>
  
          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-16 pt-10 border-t border-gray-800"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Join Thousands of Satisfied Customers</h3>
            <button className="group relative flex w-fit items-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 mx-auto">
              CHECK AVAILABILITY IN YOUR AREA
              <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const AboutUs = () => {
  return (    
    <>
      <About />
      <ServicesSection />

      {/* <!-- Core Feature Start --> */}
      <section className="bg-gray-50 relative bg-gray-950 text-gray-200 py-24 px-4">
        <div className="wrapper max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Core Features
            </h2>
            <p className="my-6 max-w-2xl mx-auto text-center text-gray-400 text-base leading-relaxed md:text-lg md:leading-relaxed">
              Unlock the Potential of Innovation. Discover the Advanced AI
              Tools Transforming Your Ideas into Reality with Unmatched
              Precision and Intelligence.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-blue-500/20 hover:border-blue-400 flex flex-col items-center"
            >
              <div className="core-feature-icon mb-9 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M25.902 5.41671H9.16675C7.09568 5.41671 5.41675 7.09564 5.41675 9.16671V30.8334C5.41675 32.9044 7.09568 34.5834 9.16675 34.5834H30.8334C32.9045 34.5834 34.5834 32.9044 34.5834 30.8334V14.0971L28.9827 19.6978C27.9748 20.7057 26.6527 21.3388 25.2356 21.4922L22.3241 21.8072C21.1953 21.9293 20.0719 21.5335 19.269 20.7306C18.4662 19.9277 18.0703 18.8044 18.1924 17.6755L18.5075 14.764C18.6608 13.3469 19.2939 12.0248 20.3018 11.0169L25.902 5.41671Z"
                    fill="blue"
                  />
                  <path
                    d="M34.7914 4.18764C33.6524 3.04861 31.8056 3.04862 30.6666 4.18765L29.524 5.33025L34.6694 10.4756L35.812 9.33301C36.951 8.19399 36.951 6.34725 35.812 5.20822L34.7914 4.18764Z"
                    fill="blue"
                  />
                  <path
                    d="M32.9016 12.2434L27.7562 7.09801L22.0695 12.7847C21.4648 13.3894 21.085 14.1827 20.993 15.0329L20.6779 17.9445C20.6372 18.3208 20.7692 18.6952 21.0368 18.9628C21.3044 19.2305 21.6789 19.3624 22.0551 19.3217L24.9667 19.0067C25.8169 18.9147 26.6102 18.5348 27.2149 17.9301L32.9016 12.2434Z"
                    fill="blue"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 text-4xl font-bold text-white dark:text-white/90 md:text-2xl max-w-[312px]"
              >
                Residential Internet
              </h3>
              <p className="text-gray-500 max-w-[312px] dark:text-gray-400">
                Let our AI-powered service simplify your content creation
                process. Start using AI today!
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-green-500/20 hover:border-green-400 flex flex-col items-center"
            >
              <div className="core-feature-icon mb-9 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.2711 30.0755C14.1949 28.19 12.9483 26.4182 11.2671 24.7764C8.94449 22.508 7.50024 19.3382 7.50024 15.8332C7.50024 8.92972 13.0966 3.33337 20.0001 3.33337C26.9034 3.33337 32.4997 8.92972 32.4997 15.8332C32.4997 19.3379 31.0557 22.5077 28.7334 24.7759C26.9982 26.4707 25.7261 28.3037 25.7261 30.2574V32.9167C25.7261 34.9877 24.0472 36.6667 21.9761 36.6667H18.0211C15.9501 36.6667 14.2711 34.9877 14.2711 32.9167V30.0755ZM10.0002 15.8332C10.0002 10.3104 14.4773 5.83337 20.0001 5.83337C25.5227 5.83337 29.9997 10.3104 29.9997 15.8332C29.9997 18.6374 28.8472 21.1702 26.9866 22.9875C25.7512 24.194 24.4672 25.7095 23.7651 27.5H16.2356C15.5333 25.7097 14.2491 24.1942 13.0139 22.9879C11.153 21.1705 10.0002 18.6375 10.0002 15.8332ZM16.7711 30.3549C16.7736 30.323 16.7747 30.2907 16.7747 30.2582C16.7747 30.1814 16.7736 30.105 16.7711 30.0292V30H23.2261V32.9167C23.2261 33.607 22.6666 34.1667 21.9761 34.1667H18.0211C17.3307 34.1667 16.7711 33.607 16.7711 32.9167V30.3549Z"
                    fill="green"
                  />
                  <path
                    d="M10.0002 15.8332C10.0002 10.3104 14.4773 5.83337 20.0001 5.83337C25.5227 5.83337 29.9997 10.3104 29.9997 15.8332C29.9997 18.6374 28.8472 21.1702 26.9866 22.9875C25.7512 24.194 24.4672 25.7095 23.7651 27.5H16.2356C15.5333 25.7097 14.2491 24.1942 13.0139 22.9879C11.153 21.1705 10.0002 18.6375 10.0002 15.8332Z"
                    fill="green"
                  />
                  <path
                    d="M2.08325 15.8334C2.08325 15.143 2.6429 14.5834 3.33325 14.5834H4.99992C5.69027 14.5834 6.24992 15.143 6.24992 15.8334C6.24992 16.5237 5.69027 17.0834 4.99992 17.0834H3.33325C2.6429 17.0834 2.08325 16.5237 2.08325 15.8334Z"
                    fill="green"
                  />
                  <path
                    d="M6.19137 6.41744C5.5935 6.07225 4.82902 6.2771 4.48383 6.87497C4.13867 7.47283 4.3435 8.23732 4.94137 8.5825L6.38475 9.41583C6.98262 9.76102 7.7471 9.55617 8.09228 8.9583C8.43745 8.36043 8.23262 7.59595 7.63475 7.25077L6.19137 6.41744Z"
                    fill="green"
                  />
                  <path
                    d="M4.48383 24.7916C4.13867 24.1938 4.3435 23.4293 4.94137 23.0841L6.38475 22.2508C6.98262 21.9056 7.7471 22.1105 8.09228 22.7083C8.43745 23.3061 8.23262 24.0706 7.63475 24.4158L6.19137 25.2491C5.5935 25.5943 4.82902 25.3895 4.48383 24.7916Z"
                    fill="green"
                  />
                  <path
                    d="M35.0002 14.5834C34.3099 14.5834 33.7502 15.143 33.7502 15.8334C33.7502 16.5237 34.3099 17.0834 35.0002 17.0834H36.6669C37.3572 17.0834 37.9169 16.5237 37.9169 15.8334C37.9169 15.143 37.3572 14.5834 36.6669 14.5834H35.0002Z"
                    fill="green"
                  />
                  <path
                    d="M31.9091 22.7083C32.2543 22.1105 33.0188 21.9056 33.6166 22.2508L35.06 23.0841C35.658 23.4293 35.8628 24.1938 35.5176 24.7916C35.1725 25.3895 34.408 25.5943 33.81 25.2491L32.3666 24.4158C31.7688 24.0706 31.564 23.3061 31.9091 22.7083Z"
                    fill="green"
                  />
                  <path
                    d="M32.3666 7.25077C31.7688 7.59595 31.564 8.36043 31.9091 8.9583C32.2543 9.55617 33.0188 9.76102 33.6166 9.41583L35.06 8.5825C35.658 8.23732 35.8628 7.47283 35.5176 6.87497C35.1725 6.2771 34.408 6.07225 33.81 6.41744L32.3666 7.25077Z"
                    fill="green"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 text-4xl font-bold text-white dark:text-white/90 md:text-2xl max-w-[312px]"
              >
                Corporate Internet
              </h3>
              <p className="text-gray-500 max-w-[312px] dark:text-gray-400">
                Discover how AI can transform your ideas into captivating
                content with our high-quality service.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-orange-500/20 hover:border-orange-400 flex flex-col items-center"
            >
              <div className="core-feature-icon mb-9 inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.2499 4.58337C21.2499 3.89302 20.6903 3.33337 19.9999 3.33337C19.3096 3.33337 18.7499 3.89302 18.7499 4.58337V7.50004H9.58325C7.51219 7.50004 5.83325 9.17897 5.83325 11.25V15.4167H5.41658C4.26599 15.4167 3.33325 16.3494 3.33325 17.5V22.5C3.33325 23.6507 4.26599 24.5834 5.41658 24.5834H5.83325V28.75C5.83325 30.821 7.51219 32.5 9.58325 32.5H30.4166C32.4876 32.5 34.1666 30.821 34.1666 28.75V24.5834H34.5833C35.7339 24.5834 36.6666 23.6507 36.6666 22.5V17.5C36.6666 16.3494 35.7339 15.4167 34.5833 15.4167H34.1666V11.25C34.1666 9.17897 32.4876 7.50004 30.4166 7.50004H21.2499V4.58337ZM15.8409 14.375C16.9915 14.375 17.9242 15.3077 17.9242 16.4583C17.9242 17.609 16.9915 18.5418 15.8409 18.5418C14.6903 18.5418 13.7576 17.609 13.7576 16.4583C13.7576 15.3077 14.6903 14.375 15.8409 14.375ZM26.2426 16.4583C26.2426 15.3077 25.3098 14.375 24.1593 14.375C23.0086 14.375 22.0759 15.3077 22.0759 16.4583C22.0759 17.609 23.0086 18.5418 24.1593 18.5418C25.3098 18.5418 26.2426 17.609 26.2426 16.4583ZM16.6824 22.0097C16.2523 21.4697 15.4659 21.3803 14.9258 21.8103C14.3857 22.2403 14.2965 23.0268 14.7265 23.5668C15.9589 25.1148 17.8635 26.1107 20 26.1107C22.1365 26.1107 24.0414 25.1148 25.2737 23.5668C25.7037 23.0268 25.6145 22.2403 25.0744 21.8103C24.5344 21.3803 23.7479 21.4697 23.3179 22.0097C22.5394 22.9875 21.3429 23.6107 20 23.6107C18.6572 23.6107 17.4607 22.9875 16.6824 22.0097Z"
                    fill="orange"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 text-4xl font-bold text-white dark:text-white/90 md:text-2xl max-w-[312px]"
              >
                WiFi for Business
              </h3>
              <p className="text-gray-500 max-w-[312px] dark:text-gray-400">
                Effortlessly access AI-generated content for your blogs,
                websites, and more with our high-quality, convenient service.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-yellow-500/20 hover:border-yellow-400 flex flex-col items-center"
            >
              <div className="core-feature-icon mb-9 inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.33329 20C3.33329 10.7953 10.7952 3.33337 19.9999 3.33337C29.2048 3.33337 36.6666 10.7953 36.6666 20C36.6666 29.2047 29.2048 36.6667 19.9999 36.6667H4.58329C4.07772 36.6667 3.62192 36.3622 3.42844 35.895C3.23497 35.428 3.3419 34.8904 3.6994 34.5329L7.36397 30.8682C4.85285 27.951 3.33329 24.152 3.33329 20ZM15.8409 13.125C16.9915 13.125 17.9242 14.0577 17.9242 15.2083C17.9242 16.3589 16.9915 17.2918 15.8409 17.2918C14.6903 17.2918 13.7576 16.3589 13.7576 15.2083C13.7576 14.0577 14.6903 13.125 15.8409 13.125ZM26.2426 15.2083C26.2426 14.0577 25.3099 13.125 24.1593 13.125C23.0086 13.125 22.0759 14.0577 22.0759 15.2083C22.0759 16.3589 23.0086 17.2918 24.1593 17.2918C25.3099 17.2918 26.2426 16.3589 26.2426 15.2083ZM16.6823 20.7597C16.2523 20.2197 15.4659 20.1303 14.9258 20.5603C14.3857 20.9903 14.2965 21.7768 14.7265 22.3168C15.9589 23.8648 17.8635 24.8607 20.0002 24.8607C22.1367 24.8607 24.0413 23.8648 25.2737 22.3168C25.7037 21.7768 25.6145 20.9903 25.0743 20.5603C24.5343 20.1303 23.7478 20.2197 23.3178 20.7597C22.5393 21.7375 21.343 22.3607 20.0002 22.3607C18.6573 22.3607 17.4608 21.7375 16.6823 20.7597Z"
                    fill="yellow"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 text-4xl font-bold text-white dark:text-white/90 md:text-2xl max-w-[312px]"
              >
               24/7 Support
              </h3>
              <p className="text-gray-500 max-w-[312px] dark:text-gray-400">
                Experience effortless content creation with our AI service.
                Write less, accomplish more.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400 flex flex-col items-center"
            >
              <div className="core-feature-icon mb-9 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.9999 6.25C20.3604 6.25 20.7034 6.40565 20.9408 6.67702L27.8526 14.5787L34.6249 9.03498C35.0193 8.71218 35.5699 8.66108 36.0169 8.90583C36.4639 9.15058 36.7176 9.64218 36.6581 10.1483L34.4178 29.1882C34.1956 31.0767 32.5951 32.5 30.6936 32.5H9.30638C7.40483 32.5 5.80427 31.0767 5.58207 29.1882L3.34185 10.1483C3.2823 9.64218 3.53595 9.15058 3.98293 8.90583C4.42992 8.66108 4.98073 8.71218 5.37507 9.03498L12.1473 14.5787L19.0591 6.67702C19.2964 6.40565 19.6394 6.25 19.9999 6.25ZM19.9999 9.39857L13.2325 17.1352C12.7884 17.6428 12.0217 17.7067 11.4998 17.2795L6.18638 12.9299L7.4363 23.5532H32.5636L33.8136 12.9299L28.5001 17.2795C27.9783 17.7067 27.2114 17.6428 26.7674 17.1352L19.9999 9.39857ZM32.2694 26.0532H7.73045L8.06495 28.896C8.13902 29.5255 8.67253 30 9.30638 30H30.6936C31.3274 30 31.8609 29.5255 31.9349 28.896L32.2694 26.0532Z"
                    fill="purple"
                  />
                  <path
                    d="M19.9999 9.39857L13.2325 17.1352C12.7884 17.6428 12.0217 17.7067 11.4998 17.2795L6.18638 12.9299L7.4363 23.5532H32.5636L33.8136 12.9299L28.5001 17.2795C27.9783 17.7067 27.2114 17.6428 26.7674 17.1352L19.9999 9.39857Z"
                    fill="purple"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 text-4xl font-bold text-white dark:text-white/90 md:text-2xl max-w-[312px]"
              >
                IT Outsourcing
              </h3>
              <p className="text-gray-500 max-w-[312px] dark:text-gray-400">
                Get expertly crafted content in no time with our AI service.
                Where quality meets speed.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-xl p-6 text-center border border-red-500/20 hover:border-red-400 flex flex-col items-center"
            >
              <div className="core-feature-icon mb-9 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.7373 3.39262C22.2553 3.55808 22.6069 4.03952 22.6069 4.58333V15.358H32.0248C32.4926 15.358 32.9212 15.6193 33.1357 16.0351C33.3501 16.4508 33.3144 16.9514 33.0433 17.3328L19.6618 36.1412C19.3466 36.5844 18.7809 36.7729 18.2629 36.6074C17.7449 36.4419 17.3933 35.9604 17.3933 35.4167V24.6419H7.97535C7.50754 24.6419 7.07889 24.3807 6.86444 23.9649C6.64997 23.5492 6.68562 23.0486 6.95682 22.6674L20.3383 3.8587C20.6536 3.41558 21.2191 3.22713 21.7373 3.39262ZM10.3987 22.1419H18.6433C18.9748 22.1419 19.2928 22.2738 19.5271 22.5081C19.7616 22.7426 19.8933 23.0604 19.8933 23.3919V31.5034L29.6014 17.8581H21.3569C20.6664 17.8581 20.1069 17.2984 20.1069 16.6081V8.49655L10.3987 22.1419Z"
                    fill="red"
                  />
                  <path
                    d="M10.3987 22.1419H18.6433C18.9748 22.1419 19.2928 22.2738 19.5271 22.5081C19.7616 22.7426 19.8933 23.0604 19.8933 23.3919V31.5034L29.6014 17.8581H21.3569C20.6664 17.8581 20.1069 17.2984 20.1069 16.6081V8.49655L10.3987 22.1419Z"
                    fill="red"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 text-4xl font-bold text-white dark:text-white/90 md:text-2xl max-w-[312px]"
              >
                Project Manaagement
              </h3>
              <p className="text-gray-500 max-w-[312px] dark:text-gray-400">
                Partner with AI to create content that connects with your
                audience. Give it a try now.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
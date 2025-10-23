const ServicesSection = () => {
  const services = [
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

  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      hover: "hover:border-blue-400"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
      hover: "hover:border-purple-400"
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      hover: "hover:border-green-400"
    }
  };

  return (
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
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-${service.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
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
  );
};
import { useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiGlobe, FiLinkedin, FiTwitter, FiMail, FiArrowRight } from "react-icons/fi";
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

// Define TypeScript interfaces
interface ColorConfig {
  bg: string;
  text: string;
  border: string;
  hover: string;
}

interface ColorMap {
  blue: ColorConfig;
  purple: ColorConfig;
  green: ColorConfig;
  orange: ColorConfig;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email: string;
  };
  color: keyof ColorMap;
}

interface Department {
  name: string;
  description: string;
  icon: React.ReactElement;
  color: keyof ColorMap;
  memberCount: number;
}

const Team = () => {
  const colorMap: ColorMap = {
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
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
      hover: "hover:border-orange-400"
    }
  };

  const departments: Department[] = [
    {
      name: "Leadership",
      description: "Visionary leaders driving Rexifi's mission to connect Africa",
      icon: <FiAward className="w-6 h-6" />,
      color: "blue",
      memberCount: 4
    },
    {
      name: "Technology",
      description: "Innovators building Africa's most reliable internet infrastructure",
      icon: <FiGlobe className="w-6 h-6" />,
      color: "purple",
      memberCount: 12
    },
    {
      name: "Operations",
      description: "Experts ensuring seamless service delivery across all regions",
      icon: <FiUsers className="w-6 h-6" />,
      color: "green",
      memberCount: 8
    },
    {
      name: "Customer Success",
      description: "Dedicated professionals committed to exceptional user experiences",
      icon: <FiMail className="w-6 h-6" />,
      color: "orange",
      memberCount: 6
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Sarah Mensah",
      role: "Chief Executive Officer",
      department: "Leadership",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      bio: "Former telecom executive with 15+ years experience in building connectivity solutions across Africa. Passionate about bridging the digital divide.",
      expertise: ["Strategic Planning", "Business Development", "Telecom Infrastructure"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah.mensah@rexifi.com"
      },
      color: "blue"
    },
    {
      id: 2,
      name: "Kwame Osei",
      role: "Chief Technology Officer",
      department: "Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Tech visionary with expertise in fiber optics and wireless networks. Led multiple successful infrastructure deployments across West Africa.",
      expertise: ["Network Architecture", "Fiber Optics", "Wireless Technology"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "kwame.osei@rexifi.com"
      },
      color: "purple"
    },
    {
      id: 3,
      name: "Amina Bello",
      role: "Head of Operations",
      department: "Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      bio: "Operations specialist with a track record of scaling tech companies across multiple African markets. Focused on efficiency and quality.",
      expertise: ["Process Optimization", "Team Leadership", "Quality Assurance"],
      social: {
        linkedin: "#",
        email: "amina.bello@rexifi.com"
      },
      color: "green"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Customer Success Director",
      department: "Customer Success",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Customer experience expert dedicated to ensuring every Rexifi user receives world-class support and service.",
      expertise: ["Customer Support", "Experience Design", "Service Delivery"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david.thompson@rexifi.com"
      },
      color: "orange"
    },
    {
      id: 5,
      name: "Grace Williams",
      role: "Network Infrastructure Lead",
      department: "Technology",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      bio: "Engineering lead specializing in last-mile connectivity solutions. Passionate about bringing high-speed internet to underserved communities.",
      expertise: ["Last-Mile Connectivity", "Infrastructure Planning", "Technical Deployment"],
      social: {
        linkedin: "#",
        email: "grace.williams@rexifi.com"
      },
      color: "purple"
    },
    {
      id: 6,
      name: "Michael Adebayo",
      role: "Regional Operations Manager",
      department: "Operations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      bio: "Field operations expert managing deployment teams across multiple regions. Ensures timely and quality service installation.",
      expertise: ["Field Operations", "Team Management", "Deployment Strategy"],
      social: {
        linkedin: "#",
        email: "michael.adebayo@rexifi.com"
      },
      color: "green"
    }
  ];

  const [activeDepartment, setActiveDepartment] = useState<string>("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredMembers = activeDepartment === "all" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeDepartment);

  return (
    <>

      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 bg-gray-950 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300 mb-4">
              MEET OUR TEAM
            </span>
            <h2 className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              The Visionaries Behind
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Africa's Connectivity Revolution
              </span>
            </h2>
            <p className="my-6 max-w-2xl mx-auto text-center text-gray-400 text-base leading-relaxed md:text-lg md:leading-relaxed">
              Meet the passionate innovators and experts dedicated to transforming internet connectivity 
              across Africa with cutting-edge technology and unwavering commitment.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">30+</div>
              <div className="text-gray-400 text-sm">Team Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">8</div>
              <div className="text-gray-400 text-sm">African Countries</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Customers Served</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Expert Teams</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialized departments working together to deliver exceptional internet experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border ${colorMap[dept.color].border} ${colorMap[dept.color].hover} transition-all duration-300 hover:scale-105`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[dept.color].bg} mb-4`}>
                  <div className={colorMap[dept.color].text}>
                    {dept.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{dept.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{dept.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{dept.memberCount} members</span>
                  <button 
                    onClick={() => setActiveDepartment(dept.name)}
                    className={`text-xs font-medium ${colorMap[dept.color].text} hover:underline`}
                  >
                    View Team
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Leadership</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The visionary leaders and experts driving Rexifi's mission forward
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveDepartment("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeDepartment === "all"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Teams
            </button>
            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => setActiveDepartment(dept.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeDepartment === dept.name
                    ? `${colorMap[dept.color].solid || 'bg-blue-500'} text-white shadow-lg`
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border ${colorMap[member.color].border} ${colorMap[member.color].hover} transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                    <p className="text-gray-400 text-xs">{member.department}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.slice(0, 2).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 text-xs rounded-full ${colorMap[member.color].bg} ${colorMap[member.color].text}`}
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                      +{member.expertise.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button className={`text-sm font-medium ${colorMap[member.color].text} hover:underline`}>
                    View Profile
                  </button>
                  <div className="flex space-x-2">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FiLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FiTwitter className="w-4 h-4" />
                      </a>
                    )}
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <FiMail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Join Our Team</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the revolution transforming internet connectivity across Africa. 
              Explore exciting career opportunities with Rexifi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                View Open Positions
                <FiArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-white hover:text-white">
                Contact HR
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <RexifiFooter />
      
    </>
  );
};

export default Team;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCheck, FiArrowRight, FiPlus, FiStar, FiShield, FiAward, FiZap, FiLoader } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';

// Define types
interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  propertyType: string;
  preferredDate: string;
  preferredTime: string;
  specialRequirements: string;
  internetUsage: string;
  currentProvider: string;
  numberOfDevices: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  propertyType?: string;
  [key: string]: string | undefined;
}

interface PropertyType {
  value: string;
  label: string;
  icon: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

interface SurveyBenefit {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface ColorMap {
  bg: string;
  text: string;
  border: string;
  gradient: string;
  solid: string;
}

const GetFreeSurveyPage = () => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    propertyType: '',
    preferredDate: '',
    preferredTime: '',
    specialRequirements: '',
    internetUsage: '',
    currentProvider: '',
    numberOfDevices: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const propertyTypes: PropertyType[] = [
    { value: 'residential', label: 'Residential Home', icon: '🏠', color: 'blue' },
    { value: 'apartment', label: 'Apartment', icon: '🏢', color: 'green' },
    { value: 'office', label: 'Office Building', icon: '🏢', color: 'purple' },
    { value: 'commercial', label: 'Commercial Space', icon: '🏪', color: 'orange' },
    { value: 'industrial', label: 'Industrial', icon: '🏭', color: 'blue' }
  ];

  const internetUsageOptions = [
    'Basic browsing and email',
    'Streaming and social media',
    'Working from home',
    'Online gaming and 4K streaming',
    'Business and enterprise use'
  ];

  const surveyBenefits: SurveyBenefit[] = [
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Professional Site Assessment',
      description: 'Expert analysis of your location for optimal connectivity'
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Customized Solution',
      description: 'Tailored internet plan based on your specific needs'
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: 'Free Installation Quote',
      description: 'No-cost detailed estimate for setup and installation'
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: 'Signal Strength Analysis',
      description: 'Comprehensive testing of available signal quality'
    }
  ];

  const colorMap: Record<'blue' | 'purple' | 'green' | 'orange', ColorMap> = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      gradient: "from-blue-500/20 to-blue-600/10",
      solid: "bg-blue-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
      gradient: "from-purple-500/20 to-purple-600/10",
      solid: "bg-purple-500"
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      gradient: "from-green-500/20 to-green-600/10",
      solid: "bg-green-500"
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
      gradient: "from-orange-500/20 to-orange-600/10",
      solid: "bg-orange-500"
    }
  };

  // Check if first three fields are filled
  const areBasicFieldsFilled = formData.fullName && formData.phone && formData.email;

  // Validation function
  const validateFields = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (showAdditionalFields) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleShowAdditionalFields = () => {
    if (validateFields()) {
      setShowAdditionalFields(true);
    }
  };

  const sendEmail = async (data: FormData) => {
    // Using EmailJS service (you'll need to set this up)
    // Alternative: Using a backend API endpoint
    
    try {
      // Method 1: Using a backend API route (recommended)
      const response = await fetch('/api/send-survey-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'brightiweobi.ib@gmail.com',
          subject: `New Free Survey Request - ${data.fullName}`,
          formData: data
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback: Open default email client
      const subject = `New Free Survey Request - ${data.fullName}`;
      const body = `
New Free Site Survey Request:

Contact Information:
- Name: ${data.fullName}
- Phone: ${data.phone}
- Email: ${data.email}

Property Details:
- Address: ${data.address}
- Property Type: ${data.propertyType}
- Internet Usage: ${data.internetUsage}
- Number of Devices: ${data.numberOfDevices}

Additional Information:
- Special Requirements: ${data.specialRequirements || 'None'}
- Submission Time: ${new Date().toLocaleString()}

Please follow up with this potential customer as soon as possible.
      `.trim();

      const mailtoLink = `mailto:brightiweobi.ib@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      return { success: true, method: 'mailto' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        console.log('Survey request submitted:', formData);
        setIsSubmitted(true);
        
        // Reset form after delay
        setTimeout(() => {
          setFormData({
            fullName: '',
            phone: '',
            email: '',
            address: '',
            propertyType: '',
            preferredDate: '',
            preferredTime: '',
            specialRequirements: '',
            internetUsage: '',
            currentProvider: '',
            numberOfDevices: ''
          });
          setShowAdditionalFields(false);
          setErrors({});
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (areBasicFieldsFilled) {
      setErrors(prev => ({
        ...prev,
        fullName: '',
        phone: '',
        email: ''
      }));
    }
  }, [formData.fullName, formData.phone, formData.email]);

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

  const additionalFieldsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <FiCheck className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Your free site survey request has been submitted successfully. 
            Our team will contact you within 24 hours to schedule your assessment.
          </p>
          <p className="text-lg text-blue-400 mb-8">
            We've sent a confirmation to your email and our team has been notified.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSubmitted(false);
              setShowAdditionalFields(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Submit Another Request
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
                🎯 FREE SITE SURVEY
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Get Your Free
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Site Survey</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Let our experts assess your location and recommend the perfect internet solution. 
                Get a professional site analysis completely free of charge.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
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
                What's Included in Your <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Free Survey</span>
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {surveyBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-center"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-400">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Survey Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-2 border-blue-500/20 shadow-2xl"
              >
                {/* Form Header */}
                <div className="text-center mb-8">
                  <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-4">
                    Request Your Free Survey
                  </motion.h2>
                  <motion.p variants={itemVariants} className="text-gray-400">
                    Complete the form below and our team will contact you to schedule your free site assessment
                  </motion.p>
                </div>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
                  >
                    <p className="text-red-400 text-center">{submitError}</p>
                  </motion.div>
                )}

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className={`flex items-center gap-2 ${!showAdditionalFields ? 'text-blue-400' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      !showAdditionalFields ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}>
                      1
                    </div>
                    <span className="text-sm">Basic Info</span>
                  </div>
                  <div className="w-12 h-1 bg-gray-700"></div>
                  <div className={`flex items-center gap-2 ${showAdditionalFields ? 'text-blue-400' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      showAdditionalFields ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}>
                      2
                    </div>
                    <span className="text-sm">Details</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Basic Information Fields */}
                  <div className="space-y-6">
                    {/* Basic Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.fullName ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.fullName && (
                          <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                          }`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Additional Fields - Animated Appearance */}
                    <AnimatePresence>
                      {showAdditionalFields && (
                        <motion.div
                          variants={additionalFieldsVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="space-y-6"
                        >
                          <div className="border-t border-gray-700 pt-6">
                            <div className="flex items-center gap-2 mb-6">
                              <FiPlus className="w-5 h-5 text-green-400" />
                              <h4 className="text-lg font-semibold text-white">Additional Information</h4>
                            </div>

                            {/* Property Information */}
                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Property Address *
                                </label>
                                <div className="relative">
                                  <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                  <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                                      errors.address ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                                    }`}
                                    placeholder="Enter your full address"
                                  />
                                </div>
                                {errors.address && (
                                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Property Type *
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {propertyTypes.map((type) => (
                                    <button
                                      key={type.value}
                                      type="button"
                                      onClick={() => handleInputChange('propertyType', type.value)}
                                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                        formData.propertyType === type.value
                                          ? `${colorMap[type.color].border} ${colorMap[type.color].bg}`
                                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                      }`}
                                    >
                                      <div className="text-2xl mb-2">{type.icon}</div>
                                      <div className="text-sm font-medium text-white">{type.label}</div>
                                    </button>
                                  ))}
                                </div>
                                {errors.propertyType && (
                                  <p className="text-red-400 text-sm mt-1">{errors.propertyType}</p>
                                )}
                              </div>
                            </div>

                            {/* Internet Usage */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Primary Internet Usage
                                </label>
                                <select
                                  value={formData.internetUsage}
                                  onChange={(e) => handleInputChange('internetUsage', e.target.value)}
                                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                >
                                  <option value="">Select usage type</option>
                                  {internetUsageOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Number of Connected Devices
                                </label>
                                <select
                                  value={formData.numberOfDevices}
                                  onChange={(e) => handleInputChange('numberOfDevices', e.target.value)}
                                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                >
                                  <option value="">Select number</option>
                                  <option value="1-3">1-3 devices</option>
                                  <option value="4-6">4-6 devices</option>
                                  <option value="7-10">7-10 devices</option>
                                  <option value="10+">10+ devices</option>
                                </select>
                              </div>
                            </div>

                            {/* Special Requirements */}
                            <div className="mt-6">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Special Requirements or Notes
                              </label>
                              <textarea
                                value={formData.specialRequirements}
                                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                placeholder="Any specific requirements or notes for our technician..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex justify-center">
                    {!showAdditionalFields ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: areBasicFieldsFilled ? 1.02 : 1 }}
                        whileTap={{ scale: areBasicFieldsFilled ? 0.98 : 1 }}
                        onClick={handleShowAdditionalFields}
                        disabled={!areBasicFieldsFilled}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3"
                      >
                        Continue to Details
                        <FiArrowRight className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setShowAdditionalFields(false)}
                          className="px-8 py-4 text-gray-300 hover:text-white transition-colors border border-gray-600 rounded-2xl"
                        >
                          Back
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <FiLoader className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Submit Free Survey Request
                              <FiCheck className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    )}
                  </div>
                </form>
              </motion.div>
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
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Transform Your <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Connectivity</span>?
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trusted Rexifi for their internet solutions
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      </div>

      <RexifiFooter />
    </>
  );
};

export default GetFreeSurveyPage;
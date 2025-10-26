import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiCheck, FiUser, FiArrowRight, FiPlus, FiInfo } from 'react-icons/fi';

// Define types for the component props
interface FreeSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the form data type
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

// Define errors type
interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  propertyType?: string;
  [key: string]: string | undefined;
}

const FreeSurveyModal = ({ isOpen, onClose }: FreeSurveyModalProps) => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
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

  const propertyTypes = [
    { value: 'residential', label: 'Residential Home', icon: '🏠' },
    { value: 'apartment', label: 'Apartment', icon: '🏢' },
    { value: 'office', label: 'Office Building', icon: '🏢' },
    { value: 'commercial', label: 'Commercial Space', icon: '🏪' },
    { value: 'industrial', label: 'Industrial', icon: '🏭' }
  ];

  const internetUsageOptions = [
    'Basic browsing and email',
    'Streaming and social media',
    'Working from home',
    'Online gaming and 4K streaming',
    'Business and enterprise use'
  ];

  const surveyBenefits = [
    'Professional site assessment',
    'Customized connectivity solution',
    'Free installation quote',
    'Signal strength analysis',
    'Equipment recommendations'
  ];

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
  };

  const handleShowAdditionalFields = () => {
    if (validateFields()) {
      setShowAdditionalFields(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateFields()) {
      // Handle form submission
      console.log('Survey request submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Thank you! Your free survey request has been submitted. We will contact you shortly.');
      onClose();
      
      // Reset form
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

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -50
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-blue-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {!showAdditionalFields ? 'Free Site Survey' : 'Additional Details'}
                  </h2>
                  <p className="text-blue-100">
                    {!showAdditionalFields 
                      ? 'Get professional assessment for optimal connectivity' 
                      : 'Help us understand your specific needs'
                    }
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${!showAdditionalFields ? 'bg-white' : 'bg-white/50'}`}></div>
                <div className={`w-3 h-3 rounded-full ${showAdditionalFields ? 'bg-white' : 'bg-white/50'}`}></div>
                <span className="text-blue-100 text-sm ml-2">
                  Step {showAdditionalFields ? '2' : '1'} of 2
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                {/* Basic Information Fields - Always Visible */}
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FiUser className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {!showAdditionalFields ? 'Contact Information' : 'Almost Done!'}
                    </h3>
                    <p className="text-gray-400">
                      {!showAdditionalFields 
                        ? "We'll use this information to contact you about your free survey" 
                        : 'Add a few more details to help us serve you better'
                      }
                    </p>
                  </div>

                  {/* Basic Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <div className="flex items-center gap-2 mb-4">
                            <FiPlus className="w-5 h-5 text-green-400" />
                            <h4 className="text-lg font-semibold text-white">Additional Information</h4>
                          </div>

                          {/* Property Information */}
                          <div className="space-y-4">
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
                                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                      formData.propertyType === type.value
                                        ? 'border-blue-500 bg-blue-500/10'
                                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                    }`}
                                  >
                                    <div className="text-xl mb-1">{type.icon}</div>
                                    <div className="text-xs font-medium text-white">{type.label}</div>
                                  </button>
                                ))}
                              </div>
                              {errors.propertyType && (
                                <p className="text-red-400 text-sm mt-1">{errors.propertyType}</p>
                              )}
                            </div>
                          </div>

                          {/* Internet Usage */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                          <div className="mt-4">
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

                          {/* Benefits Summary */}
                          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 mt-4">
                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                              <FiInfo className="w-4 h-4" />
                              Your Free Survey Includes:
                            </h4>
                            <div className="space-y-2">
                              {surveyBenefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                                  <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  {benefit}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>

                  <div className="flex gap-3">
                    {showAdditionalFields && (
                      <button
                        type="button"
                        onClick={() => setShowAdditionalFields(false)}
                        className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                      >
                        Back
                      </button>
                    )}
                    
                    {!showAdditionalFields ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: areBasicFieldsFilled ? 1.02 : 1 }}
                        whileTap={{ scale: areBasicFieldsFilled ? 0.98 : 1 }}
                        onClick={handleShowAdditionalFields}
                        disabled={!areBasicFieldsFilled}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                      >
                        Continue
                        <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                      >
                        Submit Request
                        <FiCheck className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FreeSurveyModal;
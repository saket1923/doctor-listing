import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaGraduationCap, FaCalendarCheck, FaLanguage } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  // Calculate the primary consultation fee
  const primaryConsultation = doctor.consultationTypes && doctor.consultationTypes.length > 0
    ? doctor.consultationTypes[0]
    : { type: 'Consultation', fee: 0 };
    
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Generate stars for rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar && stars.length < 5) {
      stars.push(
        <span key="half-star" className="text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }
    
    // Fill remaining stars as empty
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-star-${stars.length}`} className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }
    
    return stars;
  };

  return (
    <motion.div 
      className="card overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="h-24 w-24 rounded-full bg-primary-50 border-2 border-primary-100 flex items-center justify-center overflow-hidden">
              {doctor.imageUrl ? (
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primary-600">
                  {doctor.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          {/* Doctor Information */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                  Dr. {doctor.name}
                </h2>
                
                <p className="text-sm text-slate-600 mb-2">
                  {doctor.specialties.slice(0, 3).join(' • ')}
                  {doctor.specialties.length > 3 && ' • ...'}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-3">
                    {renderRatingStars(doctor.rating)}
                    <span className="ml-1 text-sm text-slate-600">({doctor.reviews})</span>
                  </div>
                  <div className="text-sm text-slate-600 flex items-center">
                    <FaGraduationCap className="mr-1 text-slate-500" />
                    <span>{doctor.experience}+ years exp</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 md:mt-0">
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">{primaryConsultation.type}</div>
                  <div className="text-xl font-semibold text-slate-900">
                    {formatCurrency(primaryConsultation.fee)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm">
                <FaMapMarkerAlt className="mr-2 text-slate-400" />
                <span className="text-slate-600">{doctor.location || 'Mumbai, India'}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <FaLanguage className="mr-2 text-slate-400" />
                <span className="text-slate-600">
                  {doctor.languages.slice(0, 3).join(', ') || 'English, Hindi'}
                </span>
              </div>
            </div>
            
            {doctor.education && doctor.education.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-md mb-4">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Education: </span>
                  {doctor.education.join(' • ')}
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {doctor.consultationTypes.map((consultation, index) => (
                <div 
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
                >
                  {consultation.type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 border-t border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center">
            <FaCalendarCheck className="text-success-500 mr-2" />
            <span className="text-sm text-slate-700">Available today</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <motion.button
              className="btn px-4 py-2 border border-primary-500 text-primary-600 hover:bg-primary-50 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Profile
            </motion.button>
            
            <motion.button
              className="btn-primary px-4 py-2 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Appointment
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
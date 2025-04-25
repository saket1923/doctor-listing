import React from 'react';
import { motion } from 'framer-motion';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }) => {
  // Animation variants for list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  // Animation variants for individual cards
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          We couldn't find any doctors matching your search criteria. Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-slate-600 font-medium">
          {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} found
        </p>
      </div>
      
      {doctors.map((doctor) => (
        <motion.div 
          key={doctor.id}
          variants={itemVariants}
        >
          <DoctorCard doctor={doctor} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DoctorList;
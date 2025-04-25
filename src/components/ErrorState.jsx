import React from 'react';
import { motion } from 'framer-motion';

const ErrorState = ({ error }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-8 text-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-error-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      
      <h3 className="text-xl font-semibold mb-2">Unable to load doctors</h3>
      
      <p className="text-slate-600 max-w-md mx-auto mb-6">
        {error?.message || 'Something went wrong while fetching doctors. Please try again later.'}
      </p>
      
      <motion.button
        className="btn-primary py-2 px-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};

export default ErrorState;
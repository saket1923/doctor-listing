import React from 'react';
import { motion } from 'framer-motion';

const LoadingCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden relative mb-6">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Doctor Image Skeleton */}
          <div className="h-24 w-24 rounded-full bg-slate-200 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
          </div>
          
          {/* Doctor Information Skeleton */}
          <div className="flex-1">
            <div className="h-7 w-48 bg-slate-200 mb-2 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
            </div>
            
            <div className="h-5 w-72 bg-slate-200 mb-3 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="h-4 w-32 bg-slate-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="h-5 w-32 bg-slate-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
              </div>
              
              <div className="h-5 w-32 bg-slate-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
              </div>
            </div>
            
            <div className="h-20 bg-slate-100 rounded-md mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 border-t border-slate-100">
        <div className="flex justify-end">
          <div className="h-10 w-36 bg-slate-200 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-slate-600">Loading doctors...</p>
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </motion.div>
  );
};

export default LoadingState;
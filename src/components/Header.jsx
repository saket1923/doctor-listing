import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll event listener to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaUserMd className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-900">DocFind</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-700 hover:text-primary-600 transition-colors">
              Find Doctors
            </a>
            <a href="#" className="text-slate-700 hover:text-primary-600 transition-colors">
              Specialties
            </a>
            <a href="#" className="text-slate-700 hover:text-primary-600 transition-colors">
              Health Blog
            </a>
            <a href="#" className="text-slate-700 hover:text-primary-600 transition-colors">
              About Us
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="btn-primary py-2 px-4 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignInAlt className="mr-2" />
              Sign In
            </motion.button>
            
            <button className="md:hidden text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearchChange, doctors }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  
  // Update suggestions when input changes
  useEffect(() => {
    if (inputValue.trim().length >= 2) {
      const filtered = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    
    // Propagate search term to parent
    onSearchChange(inputValue);
  }, [inputValue, doctors, onSearchChange]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSuggestionClick = (doctorName) => {
    setInputValue(doctorName);
    setShowSuggestions(false);
    onSearchChange(doctorName);
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-slate-400" />
        </div>
        
        <motion.input
          ref={inputRef}
          type="text"
          placeholder="Search doctors by name..."
          className="w-full py-3 pl-10 pr-4 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-shadow text-slate-800 bg-white"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          whileFocus={{ boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.15)' }}
        />
        
        {inputValue && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => {
              setInputValue('');
              onSearchChange('');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 hover:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            ref={suggestionRef}
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 max-h-60 overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((doctor) => (
              <motion.li
                key={doctor.id}
                className="px-4 py-2 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(doctor.name)}
                whileHover={{ backgroundColor: 'rgba(241, 245, 249, 1)' }}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-700 font-medium">
                      {doctor.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{doctor.name}</p>
                    <p className="text-sm text-slate-500">
                      {doctor.specialties.slice(0, 2).join(', ')}
                      {doctor.specialties.length > 2 && '...'}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
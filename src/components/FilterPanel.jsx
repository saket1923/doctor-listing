import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterPanel = ({ filters, onFilterChange, filterOptions }) => {
  const [expandedSections, setExpandedSections] = useState({
    consultationType: true,
    specialties: true,
    sortBy: true
  });
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleConsultationTypeChange = (type) => {
    onFilterChange({ consultationType: type });
  };
  
  const handleSpecialtyChange = (specialty) => {
    const currentSpecialties = [...filters.specialties];
    const index = currentSpecialties.indexOf(specialty);
    
    if (index === -1) {
      // Add specialty
      currentSpecialties.push(specialty);
    } else {
      // Remove specialty
      currentSpecialties.splice(index, 1);
    }
    
    onFilterChange({ specialties: currentSpecialties });
  };
  
  const handleSortChange = (sortOption) => {
    onFilterChange({ sortBy: sortOption });
  };
  
  const clearAllFilters = () => {
    onFilterChange({
      consultationType: '',
      specialties: [],
      sortBy: 'recommended'
    });
  };
  
  // Check if any filter is applied
  const hasActiveFilters = 
    filters.consultationType !== '' || 
    filters.specialties.length > 0 || 
    filters.sortBy !== 'recommended';

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-5 lg:sticky lg:top-24"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <FaFilter className="text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        {hasActiveFilters && (
          <motion.button
            className="text-sm text-primary-600 hover:text-primary-800"
            onClick={clearAllFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All
          </motion.button>
        )}
      </div>
      
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => toggleSection('consultationType')}
        >
          <h3 className="font-medium">Consultation Type</h3>
          {expandedSections.consultationType ? (
            <FaChevronUp className="text-slate-400" />
          ) : (
            <FaChevronDown className="text-slate-400" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.consultationType && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <div 
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    filters.consultationType === '' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleConsultationTypeChange('')}
                >
                  <span className="ml-2">All Types</span>
                </div>
                
                {filterOptions.consultationTypes.map((type) => (
                  <div 
                    key={type}
                    className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                      filters.consultationType === type 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'hover:bg-slate-50'
                    }`}
                    onClick={() => handleConsultationTypeChange(type)}
                  >
                    <span className="ml-2">{type}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Specialties Filter */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => toggleSection('specialties')}
        >
          <h3 className="font-medium">Specialties</h3>
          {expandedSections.specialties ? (
            <FaChevronUp className="text-slate-400" />
          ) : (
            <FaChevronDown className="text-slate-400" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.specialties && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {filterOptions.specialties.map((specialty) => (
                  <div 
                    key={specialty}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`specialty-${specialty}`}
                      checked={filters.specialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label 
                      htmlFor={`specialty-${specialty}`}
                      className="ml-2 block text-sm text-slate-700 cursor-pointer"
                    >
                      {specialty}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Sort Options */}
      <div className="mb-2">
        <button
          className="flex items-center justify-between w-full text-left mb-3"
          onClick={() => toggleSection('sortBy')}
        >
          <h3 className="font-medium">Sort By</h3>
          {expandedSections.sortBy ? (
            <FaChevronUp className="text-slate-400" />
          ) : (
            <FaChevronDown className="text-slate-400" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.sortBy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <div 
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    filters.sortBy === 'recommended' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleSortChange('recommended')}
                >
                  <span className="ml-2">Recommended</span>
                </div>
                
                <div 
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    filters.sortBy === 'fees-low-to-high' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleSortChange('fees-low-to-high')}
                >
                  <span className="ml-2">Fees: Low to High</span>
                </div>
                
                <div 
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    filters.sortBy === 'fees-high-to-low' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleSortChange('fees-high-to-low')}
                >
                  <span className="ml-2">Fees: High to Low</span>
                </div>
                
                <div 
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    filters.sortBy === 'experience-high-to-low' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleSortChange('experience-high-to-low')}
                >
                  <span className="ml-2">Experience: Most to Least</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
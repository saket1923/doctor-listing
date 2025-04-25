import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { fetchDoctors } from './api/doctorsApi';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

function App() {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    consultationType: '',
    specialties: [],
    sortBy: 'recommended'
  });

  // Fetch doctors data
  const { data: doctors, isLoading, error } = useQuery('doctors', fetchDoctors);
  
  // Filtered doctors state
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  
  // Available filter options derived from data
  const [filterOptions, setFilterOptions] = useState({
    consultationTypes: [],
    specialties: []
  });

  // Extract filter options when data is loaded
  useEffect(() => {
    if (doctors) {
      // Extract unique consultation types
      const consultationTypes = [...new Set(doctors.flatMap(doctor => 
        doctor.consultationTypes.map(c => c.type)
      ))];
      
      // Extract unique specialties
      const specialties = [...new Set(doctors.flatMap(doctor => 
        doctor.specialties
      ))];
      
      setFilterOptions({
        consultationTypes,
        specialties
      });
      
      setFilteredDoctors(doctors);
    }
  }, [doctors]);

  // Apply filters when filters or search term changes
  useEffect(() => {
    if (!doctors) return;
    
    let result = [...doctors];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply consultation type filter
    if (filters.consultationType) {
      result = result.filter(doctor => 
        doctor.consultationTypes.some(c => 
          c.type === filters.consultationType
        )
      );
    }
    
    // Apply specialties filter
    if (filters.specialties.length > 0) {
      result = result.filter(doctor => 
        filters.specialties.every(specialty => 
          doctor.specialties.includes(specialty)
        )
      );
    }
    
    // Apply sorting
    if (filters.sortBy === 'fees-low-to-high') {
      result = result.sort((a, b) => {
        const aFee = a.consultationTypes[0]?.fee || 0;
        const bFee = b.consultationTypes[0]?.fee || 0;
        return aFee - bFee;
      });
    } else if (filters.sortBy === 'fees-high-to-low') {
      result = result.sort((a, b) => {
        const aFee = a.consultationTypes[0]?.fee || 0;
        const bFee = b.consultationTypes[0]?.fee || 0;
        return bFee - aFee;
      });
    } else if (filters.sortBy === 'experience-high-to-low') {
      result = result.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredDoctors(result);
  }, [doctors, filters, searchTerm]);

  // Handler functions
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container-custom py-6 md:py-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
            Find Your Doctor
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Search from our network of qualified healthcare professionals and book your appointment today.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SearchBar 
              onSearchChange={handleSearchChange}
              doctors={doctors || []}
            />
            
            <FilterPanel 
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={filterOptions}
            />
          </div>
          
          <div className="lg:col-span-3">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} />
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
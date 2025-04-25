import axios from 'axios';

// API endpoint
const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

/**
 * Fetch doctors data from the API
 */
export const fetchDoctors = async () => {
  try {
    const response = await axios.get(API_URL);
    
    // Process the data if needed
    const doctors = response.data.map(doctor => ({
      ...doctor,
      // Ensure consistent structure and add any derived fields
      id: doctor.id || `doctor-${Math.random().toString(36).substr(2, 9)}`,
      rating: doctor.rating || 0,
      consultationTypes: doctor.consultationTypes || [],
      specialties: doctor.specialties || [],
      experience: doctor.experience || 0,
      languages: doctor.languages || [],
      education: doctor.education || [],
      reviews: doctor.reviews || 0,
    }));
    
    return doctors;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors. Please try again later.');
  }
};
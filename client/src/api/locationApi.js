const API_URL = 'http://localhost:5000/api';

export const getLocations = async () => {
  const response = await fetch(`${API_URL}/locations`);

  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  return response.json();
};
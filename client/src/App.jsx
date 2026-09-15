import { useEffect, useState } from 'react';
import { getLocations } from './api/locationApi.js';
import CampusMap from './components/CampusMap.jsx';

function App() {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const result = await getLocations();
        setLocations(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading ATLAS...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">ATLAS</h1>

      <CampusMap buildings={locations?.buildings} />
    </main>
  );
}

export default App;
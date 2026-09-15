import { useEffect, useState } from 'react';

import { getLocations } from './api/locationApi.js';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CampusMap from './components/CampusMap.jsx';
import LocationPanel from './components/LocationPanel';

function App() {
  const [locations, setLocations] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
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
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading ATLAS...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-red-500">
        {error}
      </div>
    );
  }

  const allLocations = [
    ...(locations?.buildings || []),
    ...(locations?.facilities || []),
  ];

  const filteredLocations = allLocations.filter((location) =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          {search && filteredLocations.length > 0 && (
            <div className="mt-2 overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
              {filteredLocations.map((location) => (
                <button
                  key={location._id}
                  onClick={() => {
                    setSelectedLocation(location);
                    setSearch('');
                  }}
                  className="block w-full border-b border-gray-800 px-5 py-4 text-left last:border-b-0 hover:bg-gray-800"
                >
                  <p className="font-medium">
                    {location.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {location.type}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <CampusMap
            buildings={locations?.buildings}
            facilities={locations?.facilities}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
          />

          <LocationPanel
            location={selectedLocation}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
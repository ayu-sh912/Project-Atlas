function LocationPanel({ location }) {
  if (!location) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
        <p className="text-gray-400">
          Select a location to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
      <h2 className="text-xl font-semibold">
        {location.name}
      </h2>

      <p className="mt-2 text-gray-400">
        {location.type}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        {location.latitude}, {location.longitude}
      </p>
    </div>
  );
}

export default LocationPanel;
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapController({ selectedLocation }) {
  const map = useMap();

  if (selectedLocation) {
    map.flyTo(
      [selectedLocation.latitude, selectedLocation.longitude],
      18,
      {
        duration: 1,
      }
    );
  }

  return null;
}

function CampusMap({
  buildings = [],
  facilities = [],
  selectedLocation,
  onSelectLocation,
}) {
  const center = [27.4925, 77.6735];

  const locations = [
    ...buildings,
    ...facilities,
  ];

  return (
    <MapContainer
      center={center}
      zoom={17}
      className="h-[600px] w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController selectedLocation={selectedLocation} />

      {locations.map((location) => (
        <Marker
          key={location._id}
          position={[
            location.latitude,
            location.longitude,
          ]}
          eventHandlers={{
            click: () => onSelectLocation(location),
          }}
        >
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default CampusMap;
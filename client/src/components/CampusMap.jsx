import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

function CampusMap({ buildings = [] }) {
  const center = [27.4925, 77.6735];

  return (
    <MapContainer
      center={center}
      zoom={17}
      className="h-[600px] w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {buildings.map((building) => (
        <Marker
          key={building._id}
          position={[building.latitude, building.longitude]}
        >
          <Popup>
            <strong>{building.name}</strong>
            <br />
            {building.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default CampusMap;
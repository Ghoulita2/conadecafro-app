import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Resource, VENEZUELA_STATES } from "../../context/DatabaseContext";

// Fix for default marker icon in leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to dynamically change map view when state is selected
const MapUpdater: React.FC<{ selectedState: string }> = ({ selectedState }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedState === "Todos") {
      map.setView([7.8, -66.0], 6); // Default Venezuela view
    } else if (VENEZUELA_STATES[selectedState]) {
      map.setView(VENEZUELA_STATES[selectedState], 8); // Zoom into the state
    }
  }, [selectedState, map]);

  return null;
};

interface MapProps {
  resources: Resource[];
  selectedState: string;
}

const Map: React.FC<MapProps> = ({ resources, selectedState }) => {
  const filteredResources = selectedState === "Todos" 
    ? resources 
    : resources.filter((r) => r.state === selectedState);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer
        center={[7.8, -66.0]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater selectedState={selectedState} />
        
        {filteredResources.map((resource) => (
          <Marker key={resource.id} position={[resource.lat, resource.lng]}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-brand-black m-0">{resource.name}</h3>
                <p className="text-sm m-0 mt-1">
                  <strong>Estado:</strong> {resource.state}
                </p>
                <p className="text-sm m-0 mt-1">
                  <strong>Tipo:</strong> {resource.type}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

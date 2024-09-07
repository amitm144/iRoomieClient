import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom hook to update map view
function useMapUpdater(map, center, zoom) {
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
}

// Component to handle map updates
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useMapUpdater(map, center, zoom);
  return null;
}

export default function MapContent({ center = [51.505, -0.09], zoom = 13, children }) {
  const mapRef = useRef(null);

  useEffect(() => {
  }, [center, zoom, children]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />
      <MapUpdater center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
}


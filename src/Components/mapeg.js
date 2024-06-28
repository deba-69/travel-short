import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapEg = () => {
  const initialCoordinates = [51.459, -0.090]; // Initial coordinates
  const [centerCoordinates, setCenterCoordinates] = useState(initialCoordinates);
  const [mapKey, setMapKey] = useState(0);

  const handleButtonClick = () => {
    // Example: Update the center coordinates to a specific location when the button is clicked
    setCenterCoordinates([40.7128, -74.0060]); // New York City coordinates
    setMapKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      <MapContainer key={mapKey} center={centerCoordinates} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
      <button onClick={handleButtonClick}>Go to New York City</button>
    </div>
  );
};

export default MapEg;

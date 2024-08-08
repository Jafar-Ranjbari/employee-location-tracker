 // src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

function App() {
  const [position, setPosition] = useState([35.42, 51.21]); // Default position (London)

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
    };

    const handleError = (error) => {
      console.error('Error getting user location:', error);
    };

    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });

      return () => navigator.geolocation.clearWatch(watcher);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="App">
      <h1>Employee Location Tracker</h1>
      <MapComponent position={position} />
    </div>
  );
}

export default App;

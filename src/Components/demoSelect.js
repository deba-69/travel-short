// App.js

import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function App() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState('');
  const[k,setKey] = useState(0);
  useEffect(() => {
    fetch('http://localhost:8000/type-outlets?type=all',)
      .then(response => response.json())
      .then(data => setTrips(data))
      .catch(error => {
        console.error('Error fetching trips:', error);
      });

    //   console.log(data);
  }, []);

  const handleTripChange = event => {
    setSelectedTrip(event.target.value);
    
  };
  console.log(trips[0].name);

  const setK = () =>{
    setKey(k+1);
  }

  return (
    <div>
      <h1>Select a Trip</h1>
      <select key = {k} value={selectedTrip} onChange={handleTripChange}>
        <option value="">Select a trip</option>
        {trips.map(trip => (
          <option key={trip.loc_id} value={trip.name}>{trip.name}</option>
        ))}
      </select>
      {selectedTrip && <p>You have selected: {selectedTrip}</p>}
    </div>
  );
}

export default App;

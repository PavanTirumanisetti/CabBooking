import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import cars from '../data/cars';  // Import car data

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedCar, setSelectedCar] = useState('');  // Selected car
  const [locations, setLocations] = useState([]);  // Locations fetched
  const navigate = useNavigate();

  // Function to fetch locations (example: airports)
  const fetchLocations = async () => {
    // Static data for demo, replace with API if needed
    const staticLocations = [
      { name: 'Indira Gandhi International Airport', lat: 28.5562, lng: 77.1000 },
      { name: 'Chhatrapati Shivaji Maharaj International Airport', lat: 19.0896, lng: 72.8656 },
    ];
    setLocations(staticLocations);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = () => {
    if (pickupLocation && dropLocation && date && time && selectedCar) {
      navigate('/booking', {
        state: { pickupLocation, dropLocation, date, time, selectedCar },
      });
    } else {
      alert('Please fill all the details');
    }
  };

  return (
    <div className="home">
      <h1>Cab Booking</h1>
      <div className="form">
        <div className="form-group">
          <label>Pickup Location</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Drop Location</label>
          <input
            type="text"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Terminal</label>
          <input type="text" placeholder="e.g. Terminal 1" />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Car Selection Dropdown */}
        <div className="form-group">
          <label>Select Car</label>
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
          >
            <option value="">Select a Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.model}>
                {car.model} - {car.company} ({car.type}) - ₹{car.price} / km
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit}>Book a Cab</button>
      </div>

      {/* Google Maps for location picking */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={{ lat: 20.5937, lng: 78.9629 }}
          zoom={5}
        >
          {/* Add markers for locations */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;

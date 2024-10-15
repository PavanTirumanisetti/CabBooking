import React, { useState } from 'react';
import airportData from '../data/airportData'; 
import districtData from '../data/districtData'; 
import carData from '../data/carData'; 
import { jsPDF } from 'jspdf'; 
import ImageSlider from './ImageSlider';  // Import ImageSlider component
import './App.css';

const BookingForm = () => {
  const [pickupState, setPickupState] = useState('');
  const [dropState, setDropState] = useState('');
  const [pickupAirport, setPickupAirport] = useState('');
  const [dropDistrict, setDropDistrict] = useState(''); 
  const [terminal, setTerminal] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [car, setCar] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [submitted, setSubmitted] = useState(false); 

  const handlePickupStateChange = (e) => {
    setPickupState(e.target.value);
    setPickupAirport('');
  };

  const handleDropStateChange = (e) => {
    setDropState(e.target.value);
    setDropDistrict('');
  };

  const handlePickupAirportChange = (e) => {
    setPickupAirport(e.target.value);
  };

  const handleDropDistrictChange = (e) => {
    setDropDistrict(e.target.value);
  };

  const handleTerminalChange = (e) => {
    setTerminal(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleCarChange = (e) => {
    const selectedCar = e.target.value;
    setCar(selectedCar);
    const selectedCarPrice = carData.find((carItem) => carItem.name === selectedCar)?.price || '';
    setPrice(selectedCarPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Booking Summary', 20, 20);

    doc.setFontSize(12);
    doc.text(`Pickup State: ${pickupState}`, 20, 40);
    doc.text(`Pickup Airport: ${pickupAirport}`, 20, 50);
    doc.text(`Drop State: ${dropState}`, 20, 60);
    doc.text(`Drop District: ${dropDistrict}`, 20, 70); 
    doc.text(`Terminal: ${terminal}`, 20, 80);
    doc.text(`Date: ${date}`, 20, 90);
    doc.text(`Time: ${time}`, 20, 100);
    doc.text(`Car: ${car}`, 20, 110); 
    doc.text(`Price: ₹${price}`, 20, 120); 

    doc.save('booking-summary.pdf');
  };

  const getAirportsForState = (state) => {
    const stateData = airportData.find((data) => data.state === state);
    return stateData ? stateData.airports : [];
  };

  const getDistrictsForState = (state) => {
    const stateData = districtData.find((data) => data.state === state);
    return stateData ? stateData.districts : [];
  };

  return (
    <div>
      <h1>Victor Luxuries</h1>

      {/* Add ImageSlider component to display images one below the other */}
      <ImageSlider />

      {/* Pickup location */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pickup State:</label>
          <select value={pickupState} onChange={handlePickupStateChange}>
            <option value="">Select Pickup State</option>
            {airportData.map((data, index) => (
              <option key={index} value={data.state}>
                {data.state}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup airport */}
        <div>
          {pickupState && (
            <>
              <label>Pickup Airport:</label>
              <select value={pickupAirport} onChange={handlePickupAirportChange}>
                <option value="">Select Pickup Airport</option>
                {getAirportsForState(pickupState).map((airport, index) => (
                  <option key={index} value={airport.airport_name}>
                    {airport.airport_name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* Drop location (Districts) */}
        <div>
          <label>Drop State:</label>
          <select value={dropState} onChange={handleDropStateChange}>
            <option value="">Select Drop State</option>
            {districtData.map((data, index) => (
              <option key={index} value={data.state}>
                {data.state}
              </option>
            ))}
          </select>
        </div>

        {/* Drop district */}
        <div>
          {dropState && (
            <>
              <label>Drop District:</label>
              <select value={dropDistrict} onChange={handleDropDistrictChange}>
                <option value="">Select Drop District</option>
                {getDistrictsForState(dropState).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* Terminal input with options T1 to T6 */}
        <div>
          <label>Terminal:</label>
          <select value={terminal} onChange={handleTerminalChange}>
            <option value="">Select Terminal</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
            <option value="T4">T4</option>
            <option value="T5">T5</option>
            <option value="T6">T6</option>
          </select>
        </div>

        {/* Date input */}
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* Time input */}
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
          />
        </div>

        {/* Car selection */}
        <div>
          <label>Car:</label>
          <select value={car} onChange={handleCarChange}>
            <option value="">Select Car</option>
            {carData.map((carItem, index) => (
              <option key={index} value={carItem.name}>
                {carItem.name} - ₹{carItem.price}
              </option>
            ))}
          </select>
        </div>

        {/* Price display */}
        {car && (
          <div>
            <label>Price:</label>
            <input type="text" value={price} readOnly />
          </div>
        )}

        {/* Submit button */}
        <button type="submit">Book Now</button>
      </form>

      {/* Display booking summary after submission */}
      {submitted && (
        <div>
          <h2>Booking Summary</h2>
          <p>Pickup State: {pickupState}</p>
          <p>Pickup Airport: {pickupAirport}</p>
          <p>Drop State: {dropState}</p>
          <p>Drop District: {dropDistrict}</p> 
          <p>Terminal: {terminal}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Car: {car}</p> 
          <p>Price: ₹{price}</p> 
        </div>
      )}
    </div>
  );
};

export default BookingForm;

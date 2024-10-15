import React from 'react';
import airportData from '../data/airportData'; // Adjust path as needed

const AirportTable = () => {
  return (
    <div>
      {airportData.map((stateData, index) => (
        <div key={index}>
          <h2>{stateData.state}</h2>
          <table>
            <thead>
              <tr>
                <th>Area Served</th>
                <th>Airport Name</th>
                <th>IATA</th>
                <th>ICAO</th>
                <th>Airport Type</th>
                <th>Operational</th>
                <th>Owned/Operated By</th>
              </tr>
            </thead>
            <tbody>
              {stateData.airports.map((airport, idx) => (
                <tr key={idx}>
                  <td>{airport.area_served}</td>
                  <td>{airport.airport_name}</td>
                  <td>{airport.IATA}</td>
                  <td>{airport.ICAO}</td>
                  <td>{airport.airport_type}</td>
                  <td>{airport.operational}</td>
                  <td>{airport.owned_operated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AirportTable;

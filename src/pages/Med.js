// src/components/Meds.js
import React, { useEffect, useState } from 'react';
import '../css/Med.css';

const Meds = () => {
  const [meds, setMeds] = useState([]); // State to hold meds data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch meds data from the backend
  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const response = await fetch('https://4rlhxmck-5000.euw.devtunnels.ms/api/doctors', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        }); // Update this URL to match your endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch meds');
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setMeds(data); // Set the data in state
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMeds(); // Call the function
  }, []); // Empty dependency array so it runs once on mount

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>List Of Doctors</h2>
      {meds.length > 0 ? (
        <div className="card-container">
          {meds.map((med) => (
            <div key={med.doctor_id} className="card">
              <h3 className="name">{med.first_name} {med.last_name}</h3>
              <p className="info">Specialty: {med.specialty}</p>
              <p className="info">Availability hours: {med.availability_hours}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
}

export default Meds;

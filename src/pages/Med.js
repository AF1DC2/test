// src/components/Meds.js
import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>List Of Doctors</h2>
      {meds.length > 0 ? (
        <ul>
          {meds.map((med) => (
            <li key={med.doctor_id}>
              <h1>{med.first_name} {med.last_name}</h1>
              <p>Specialty: {med.specialty}</p>
              <p>Availability hours: {med.availability_hours}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default Meds;

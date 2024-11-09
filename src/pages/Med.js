// src/components/Meds.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Med.css';

const Meds = () => {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const response = await fetch('https://4rlhxmck-5000.euw.devtunnels.ms/api/doctors', {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch meds');
        }
        const data = await response.json();
        setMeds(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMeds();
  }, []);

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
              <button
                className="appointment-button"
                onClick={() => navigate('/appt')}
              >
                Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default Meds;

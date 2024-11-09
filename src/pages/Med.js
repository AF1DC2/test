import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Med.css';

const Med = () => {

    const navigate = useNavigate();
    const logout = () => {
  
    // Clear the token from localStorage
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    navigate('/login');
    };

    const medics = [
        { 
            id: 1, 
            name: 'Dr. John Doe', 
            specialty: 'Cardiology', 
            phone: '123-456-7890', 
            address: '123 Heart St, Health City'
        },
        { 
            id: 2, 
            name: 'Dr. Jane Smith', 
            specialty: 'Neurology', 
            phone: '987-654-3210', 
            address: '456 Brain Ave, Neuro Town'
        },
        { 
            id: 3, 
            name: 'Dr. Emily Johnson', 
            specialty: 'Pediatrics', 
            phone: '555-123-4567', 
            address: '789 Child Rd, Family Village'
        },
        { 
            id: 4, 
            name: 'Dr. Michael Brown', 
            specialty: 'Orthopedics', 
            phone: '111-222-3333', 
            address: '321 Bone Blvd, Health City'
        },
    ];

    return (
        <div>
            <div className="med-container">
                {medics.map((medic) => (
                    <div key={medic.id} className="med-card">
                        <h2>{medic.name}</h2>
                        <p><strong>Specialty:</strong> {medic.specialty}</p>
                        <p><strong>Phone:</strong> {medic.phone}</p>
                        <p><strong>Address:</strong> {medic.address}</p>
                        <button className="contact-button"> Contact
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={logout} className="logout-button">Log Out</button>
        </div>
    );
};

export default Med;

// src/App.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import { LuLogOut } from "react-icons/lu";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaHome, FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);  // State to hold user data

  const navigate = useNavigate();
    const logout = () => {
  
    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Redirect the user to the login page
    navigate('/login');
    };

  useEffect(() => {
    // Fetch user data from the backend
    const user_id = localStorage.getItem('user');
    console.log(user_id);
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://4rlhxmck-5000.euw.devtunnels.ms/api/profile/'+user_id, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setUser(data);  // Set the user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();  // Fetch user data when the component mounts
  }, []);  // Empty dependency array ensures this runs only once on mount

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';  // Return 'N/A' if the date string is missing
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns the date in MM/DD/YYYY format
  };

  return (
    <div className="profile-container">
      {user && (
        <div className="profile-table">
          <h3>User Profile</h3>
          <table>
            <tbody>
              <tr>
                <td><FaUser /> <strong>Name:</strong></td>
                <td>{user.first_name} {user.last_name}</td>
              </tr>
              
              <tr>
                <td><FaEnvelope /> <strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><FaPhone /> <strong>Phone Number:</strong></td>
                <td>{user.phone_number}</td>
              </tr>
              <tr>
                <td><FaBirthdayCake /> <strong>Birth Date:</strong></td>
                <td>{formatDate(user.birth_date)}</td>
              </tr>
              <tr>
                <td><FaVenusMars /> <strong>Gender:</strong></td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td><FaHome /> <strong>Address:</strong></td>
                <td>{user.address}</td>
              </tr>
              <tr>
                <td><FaCalendarPlus /> <strong>Created At:</strong></td>
                <td>{formatDate(user.created_at)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
        <button onClick={logout} className="logout-button"><LuLogOut /></button>
    </div>
  );
};

export default Profile;

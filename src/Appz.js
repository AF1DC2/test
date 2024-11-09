// src/App.js
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Appz = () => {
  const [user, setUser] = useState(null);  // State to hold user data
  const [message, setMessage] = useState('Connecting to database...');  // Default message

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://4rlhxmck-5000.euw.devtunnels.ms/api/user');
        const data = await response.json();

        // Check if the response is empty or has no user data
        if (!data || Object.keys(data).length === 0) {
          setMessage('No user data found');
        } else {
          setUser(data);  // Set the user data in state
          setMessage('');  // Clear the default loading message
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Error connecting to backend');
      }
    };

    fetchUserData();  // Fetch user data when the component mounts
  }, []);  // Empty dependency array ensures this runs only once on mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>

        {user && (
          <div>
            <h3>User Information:</h3>
            <p><strong>User ID:</strong> {user.user_id}</p>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phone_number}</p>
            <p><strong>Birth Date:</strong> {user.birth_date}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Created At:</strong> {user.created_at}</p>
            <p><strong>Updated At:</strong> {user.updated_at}</p>
          </div>
        )}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Appz;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbMessage, setDbMessage] = useState(''); // To display DB connection message
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      setErrorMsg(error === 'invalid' ? 'Invalid email or password.' : '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Both fields are required');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('https://4rlhxmck-5000.euw.devtunnels.ms/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful!");
        navigate('/home'); // Redirect to home upon successful login
      } else {
        setErrorMsg(data.message || 'An error occurred');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to test database connection
  const testDatabaseConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/test-db'); // Adjust URL as needed
      const data = await response.json();
      setDbMessage(data.message); // Set the message to display on the page
    } catch (error) {
      setDbMessage('Error connecting to database', JSON.stringify(error));
    }
  };

  return (
    <div className="fadeOut">
      <div className="container">
        <form onSubmit={handleSubmit} className="input">
          <div className="formContainer">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" id="loginBtn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <p className="message">
              Don't have an account?
              <Link to="/signup" id="showSignUpLink">Sign up!</Link>
            </p>
            {errorMsg && <div id="errorMsg">{errorMsg}</div>}
            <button type="button" onClick={testDatabaseConnection}>Test Database Connection</button>
            {dbMessage && <div id="dbMessage">{dbMessage}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

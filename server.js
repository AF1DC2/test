// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to fetch the first user from the database
app.get('/api/user', (req, res) => {
  const query = 'SELECT * FROM users WHERE user_id = 3'; // Adjust based on your table name and structure
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Error fetching user from database');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No users found');
      return;
    }

    // Send the first user's data
    res.json(results[0]);
  });
});

app.get('/api/profile/:user_id', (req, res) => {
  const query = `SELECT * FROM users WHERE user_id = ${req.params.user_id}`; // Adjust based on your table name and structure
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Error fetching user from database');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No users found');
      return;
    }

    res.json(results[0]);
  });
});


app.get('/api/doctors', (req, res) => {
  const query = 'SELECT doctor_id, first_name, last_name, specialty, availability_hours FROM doctors'; // SQL query to fetch all doctors

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Error fetching doctors from database');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No doctors found');
      return;
    }

    res.json(results);
  });
});

// Test endpoint to check database connection
app.get('/api/test', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json({ message: 'Database connected successfully', solution: results[0].solution });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  // Query to fetch the user based on the provided email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      // If no user is found with the provided email
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];

    // Check if the provided password matches the stored password (plain text)
    if (password === user.password_hash) {
      // Passwords match, login successful
      return res.json({
        message: 'Login successful',
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
    } else {
      // Passwords don't match
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
  });
});

app.post('/api/signup', (req, res) => {
  const { first_name, last_name, email, password, phone_number, birth_date, gender, address } = req.body;

  // Check if all required fields are provided
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields: first_name, last_name, email, and password.' });
  }

  // Check if the email is already in use
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }

    if (results.length > 0) {
      // Email already exists in the database
      return res.status(400).json({ message: 'Email is already taken. Please use a different email.' });
    }

    // Insert the new user into the database (store the plain password)
    const insertQuery = `
      INSERT INTO users (first_name, last_name, email, password_hash, phone_number, birth_date, gender, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [first_name, last_name, email, password, phone_number, birth_date, gender, address];

    db.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }

      // Respond with success message and the new user ID
      res.status(201).json({
        message: 'User account created successfully',
        user_id: results.insertId,  // Return the newly created user ID
      });
    });
  });
});

app.post('/api/salut', (req, res) => {
  const { email } = req.body;
  if(email){
    return res.json({
      message: 'Buna',
      email: email
    });
  }
  else{
    return res.status(400).json({
      message: 'e gol'
    });
  }
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

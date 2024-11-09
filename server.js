// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to fetch the first user from the database
app.get('/api/user', (req, res) => {
  const query = 'SELECT * FROM users LIMIT 1'; // Adjust based on your table name and structure
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

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

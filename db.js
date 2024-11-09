// db.js
const mysql = require('mysql');

// Database connection settings
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test' // Ensure this matches the database name created in phpMyAdmin
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;

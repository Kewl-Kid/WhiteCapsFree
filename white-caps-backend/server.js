// Imports modules

const express = require('express');
//Allows interaction with the sql database
const mysql = require('mysql2');
//Needed to parse JSON requests
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Set up middleware to parse JSON data from the request body
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Your MySQL username
    password: 'SSU4BSRL',  // Your MySQL password
    database: 'WhiteCapsConnection' // Your MySQL database name
});

// Test the database connection
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint to handle the form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    // Insert the data into the database
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    connection.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted:', result);
        res.send('Data successfully saved');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

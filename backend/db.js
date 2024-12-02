const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database or open it if it already exists
const db = new sqlite3.Database('./fgcu.db', (err) => {
     if (err) {
          console.error('Error opening database in db.js: ' + err.message);
     } else {
          console.log('Connected to the SQLite database.');
     }
});

// Function to create tables
const initializeDatabase = () => {
     db.serialize(() => {
          // Create Users table
          db.run(`
               CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    password TEXT NOT NULL,
                    location TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               )
          `);

          console.log('Database and tables created successfully.');
     });
};

// Call the initialize function
initializeDatabase();

// Close the database connection when done
db.close((err) => {
     if (err) {
          console.error('Error closing database: ' + err.message);
     } else {
          console.log('Database connection closed.');
     }
});
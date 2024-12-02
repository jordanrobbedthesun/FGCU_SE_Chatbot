const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Routes:
const homeRouter = require('./routes/home');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/home', homeRouter);

// Start the server
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
});


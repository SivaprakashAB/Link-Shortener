const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// API Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

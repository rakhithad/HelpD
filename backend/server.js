// servim
const dotenv = require('dotenv');
const connectDB = require('./db');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);



connectDB();
// Routes
const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

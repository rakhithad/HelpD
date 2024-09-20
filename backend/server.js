// servim
const connectDB = require('./db');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

connectDB();
// Routes
const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

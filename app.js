// Package Imports
const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const path = require('path');

// Create Server
const app = express();

// Route imports
const analyse = require('./routes/analyse')

// Middleware
app.use(cors())
app.use(logger('common'));
app.use(express.json())

// Routes
app.use('/api/v1/analyse', analyse)

// Port Configuration
const port = process.env.PORT || 5001;

// Server startup function
const start = async () => {
    try {
        app.listen(port, console.log(`instance is listening on port ${port}`))
    } catch (error){
        console.log(error)
    }
}

// Start Server
start()
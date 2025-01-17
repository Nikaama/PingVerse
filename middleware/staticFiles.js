const express = require('express');
const path = require('path');

// Middleware to serve static files
const serveStaticFiles = (app) => {
    // Serve files from the 'public' directory
    app.use(express.static(path.join(__dirname, '../public')));
    
    // Serve uploaded files
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
};

module.exports = serveStaticFiles;
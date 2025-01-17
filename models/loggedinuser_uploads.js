// src/models/loggedinuser_uploads.js

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db'); // Assuming you have a DB connection file

// Define the loggedinuser_uploads model
const LoggedinUserUploads = db.define('LoggedinUserUploads', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING, // Format: "Lat: xxxxx, Long: xxxxx"
    allowNull: true,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploaded_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'media_uploads', // Reference to the existing table in the database
  timestamps: false, // Assuming the table doesn't have createdAt/updatedAt
});

module.exports = LoggedinUserUploads;
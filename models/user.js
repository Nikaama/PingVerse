const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Database connection

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users', // Table name in the database
  timestamps: true,   // Automatically adds created_at and updated_at fields
});

module.exports = User;
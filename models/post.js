const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Database connection

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'userModel',  // Reference to the User model
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, // Automatically set the current timestamp
  },
}, {
  tableName: 'posts', // Table name in the database
  timestamps: false,  // Disable automatic timestamps for 'createdAt' and 'updatedAt'
});

module.exports = Post;
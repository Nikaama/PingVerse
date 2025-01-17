const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming this is where you initialize Sequelize

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure username is unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure email is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true // Add 'bio' field (if needed)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'users', // Ensure it matches your actual table name
    timestamps: false // Disable Sequelize's default timestamps if you're using your own
});

module.exports = User;
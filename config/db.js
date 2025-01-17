const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DB || 'pingverse_users',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || 'password',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL'))
    .catch(err => console.error('MySQL connection error:', err));

module.exports = sequelize;
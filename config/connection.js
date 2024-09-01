// config/connection.js
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres', // Make sure this is set to 'postgres'
    port: 5432, // Default PostgreSQL port
  }
);

module.exports = sequelize;

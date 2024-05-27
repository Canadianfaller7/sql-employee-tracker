const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to database!`)
);

module.exports = connection;

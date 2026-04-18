// Centralized application configuration
// All shared constants are defined here to avoid duplication across files

const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  PORT: process.env.PORT || 3000,
  DB: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Root1234!',
    database: process.env.DB_NAME || 'campus_reservation',
  },
};

module.exports = config;
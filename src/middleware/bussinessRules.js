const db = require('../db');

// Middleware that checks if end_time comes after start_time
// If end_time is earlier than or equal to start_time, reject the request
const validateReservationTimes = (req, res, next) => {
  const { start_time, end_time } = req.body;
  if (new Date(end_time) <= new Date(start_time)) {
    return res.status(400).json({ error: 'end_time must be after start_time' });
  }
  next();
};

// Middleware that checks if the requested resource actually exists in the database
// This prevents reservations from being created for resources that don't exist
const validateResourceExists = async (req, res, next) => {
  const { resource_id } = req.body;
  const [resource] = await db.query('SELECT * FROM resources WHERE resource_id = ?', [resource_id]);
  if (resource.length === 0) {
    return res.status(400).json({ error: 'Resource does not exist' });
  }
  next();
};

module.exports = { validateReservationTimes, validateResourceExists };
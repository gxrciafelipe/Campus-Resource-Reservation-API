const db = require('../db');

const validateReservationTimes = (req, res, next) => {
  const { start_time, end_time } = req.body;
  if (new Date(end_time) <= new Date(start_time)) {
    return res.status(400).json({ error: 'end_time must be after start_time' });
  }
  next();
};

const validateResourceExists = async (req, res, next) => {
  const { resource_id } = req.body;
  const [resource] = await db.query('SELECT * FROM resources WHERE resource_id = ?', [resource_id]);
  if (resource.length === 0) {
    return res.status(400).json({ error: 'Resource does not exist' });
  }
  next();
};

module.exports = { validateReservationTimes, validateResourceExists };
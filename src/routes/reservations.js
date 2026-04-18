const express = require('express');
const router = express.Router();
const db = require('../db');
const validate = require('../middleware/validateRequest');
const { validateReservationTimes, validateResourceExists } = require('../middleware/businessRules');
const auth = require('../middleware/authMiddleware');

// GET /api/reservations
// Returns only the needed fields instead of SELECT *
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT reservation_id, user_id, resource_id, start_time, end_time FROM reservations'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/reservations
// Validation and business rule checks run before the insert query
router.post(
  '/',
  auth,
  validate(['user_id', 'resource_id', 'start_time', 'end_time']),
  validateReservationTimes,
  validateResourceExists,
  async (req, res, next) => {
    try {
      const { user_id, resource_id, start_time, end_time } = req.body;

      const [result] = await db.query(
        'INSERT INTO reservations (user_id, resource_id, start_time, end_time) VALUES (?, ?, ?, ?)',
        [user_id, resource_id, start_time, end_time]
      );

      res.status(201).json({ reservation_id: result.insertId });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
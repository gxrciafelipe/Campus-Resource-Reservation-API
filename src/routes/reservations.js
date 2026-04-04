const express = require('express');
const router = express.Router();
const db = require('../db');
const validate = require('../middleware/validateRequest');
const { validateReservationTimes, validateResourceExists } = require('../middleware/businessRules');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

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
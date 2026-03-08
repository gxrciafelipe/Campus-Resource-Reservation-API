const express = require('express');
const router = express.Router();
const db = require('../db');
const validate = require('../middleware/validateRequest');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM reservations');
  res.json(rows);
});

router.post('/', validate(['user_id', 'resource_id', 'start_time', 'end_time']), async (req, res) => {
  const { user_id, resource_id, start_time, end_time } = req.body;

  // Business rule 1: end_time must be after start_time
  if (new Date(end_time) <= new Date(start_time)) {
    return res.status(400).json({ error: 'end_time must be after start_time' });
  }

  // Business rule 2: check if resource exists
  const [resource] = await db.query('SELECT * FROM resources WHERE resource_id = ?', [resource_id]);
  if (resource.length === 0) {
    return res.status(400).json({ error: 'Resource does not exist' });
  }

  const [result] = await db.query(
    'INSERT INTO reservations (user_id, resource_id, start_time, end_time) VALUES (?, ?, ?, ?)',
    [user_id, resource_id, start_time, end_time]
  );

  res.status(201).json({ reservation_id: result.insertId });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');
const validate = require('../middleware/validateRequest');

// GET /api/users
// Returns only non-sensitive fields; password is intentionally excluded
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT user_id, full_name, email, role FROM users'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
// Direct user creation without authentication (handled via /auth/register)
router.post('/', validate(['full_name', 'email']), async (req, res, next) => {
  try {
    const { full_name, email, role } = req.body;

    const [result] = await db.query(
      'INSERT INTO users (full_name, email, role) VALUES (?, ?, ?)',
      [full_name, email, role || 'user']
    );

    res.status(201).json({ user_id: result.insertId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const validate = require('../middleware/validateRequest');

// POST /auth/register
// Creates a new user with a hashed password and a default role of 'user'
router.post('/register', validate(['full_name', 'email', 'password']), async (req, res, next) => {
  try {
    const { full_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name, email, hashedPassword, 'user']
    );

    res.status(201).json({ user_id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
// Verifies credentials and returns a JWT token on success
router.post('/login', validate(['email', 'password']), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      'SELECT user_id, email, password, role FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
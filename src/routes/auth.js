const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

// POST /auth/register
// Creates a new user with a hashed password and default role of 'user'
router.post('/register', async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Hash the password before storing it, 10 is the number of salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
    [full_name, email, hashedPassword, 'user']
  );

  res.status(201).json({ user_id: result.insertId });
});

// POST /auth/login
// Verifies credentials and returns a JWT token on success
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Look up the user by email
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = rows[0];

  // Compare the provided password against the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT token containing the user's id and role
  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
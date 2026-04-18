const express = require('express');
const router = express.Router();
const db = require('../db');
const validate = require('../middleware/validateRequest');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// GET /api/resources
// Returns only the fields the client needs instead of SELECT *
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT resource_id, resource_name, resource_type, location FROM resources'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/resources (admin only)
// location is now validated by the validate middleware alongside other required fields
router.post(
  '/',
  auth,
  requireRole('admin'),
  validate(['resource_name', 'resource_type', 'location']),
  async (req, res, next) => {
    try {
      const { resource_name, resource_type, location } = req.body;

      const [result] = await db.query(
        'INSERT INTO resources (resource_name, resource_type, location) VALUES (?, ?, ?)',
        [resource_name, resource_type, location]
      );

      res.status(201).json({ resource_id: result.insertId });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
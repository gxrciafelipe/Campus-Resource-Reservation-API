const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

// Middleware that checks if a valid JWT token is present in the request headers
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Reject the request if no authorization header is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  // The header format is "Bearer <token>", so we split and take the second part
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and attach the decoded payload to req.user
    // This makes user info available to any middleware or route handler that runs after
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
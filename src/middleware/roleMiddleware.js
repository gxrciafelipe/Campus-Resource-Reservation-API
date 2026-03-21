// Middleware factory that checks if the logged in user has the required role
// It receives a role as an argument and returns a middleware function
module.exports = (requiredRole) => {
  return (req, res, next) => {
    // req.user is set by authMiddleware, so this must always run after it
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
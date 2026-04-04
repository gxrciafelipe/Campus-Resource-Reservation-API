// Centralized error handler that catches errors forwarded by next(err)
// Sends a consistent JSON response so the client always gets a predictable format
// Avoids leaking stack traces by only sending the message, not the full error object
module.exports = (err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
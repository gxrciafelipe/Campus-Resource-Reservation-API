// Logs every incoming request with the timestamp, HTTP method, and route path
// This helps with debugging by showing exactly what requests are hitting the server and when
module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};
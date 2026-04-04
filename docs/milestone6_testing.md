# Milestone 6 - Testing Notes

## Logged Request Example
Every request is logged to the console automatically by the requestLogger middleware.

Example console output when hitting GET /api/users:
[2025-03-01T14:00:00.000Z] GET /api/users

---

## Handled Error Response Example
If a database error occurs, the centralized error handler catches it and returns:

Status: 500
{"error": "Internal server error"}

The server continues running normally after the error.

---

## Validation Error Example
POST /api/resources without a location field returns:

Status: 400
{"error": "location is required"}

POST /api/users without an email field returns:

Status: 400
{"error": "Missing required field: email"}
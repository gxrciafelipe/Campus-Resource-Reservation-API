# Milestone 4 - Testing Notes

## Failed Validation Example
POST /api/users with missing email field.

Request body:
{"full_name": "John Doe"}

Response:
{"error": "Missing required field: email"}

---

## Handled Server Error Example
If the database is unreachable, the centralized error handler catches the error
and returns a consistent response instead of crashing the server.

Response:
{"error": "An unexpected server error occurred"}

---

## Successful Request After Validation Example
POST /api/reservations with all required fields and valid times.

Request body:
{"user_id": 1, "resource_id": 1, "start_time": "2025-03-01 10:00:00", "end_time": "2025-03-01 12:00:00"}

Response:
{"reservation_id": 1}
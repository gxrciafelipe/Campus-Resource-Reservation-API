# Milestone 5 - Testing Notes

## Successful Login
POST /auth/login with valid credentials returns a JWT token.

Request body:
{"email": "john@uni.edu", "password": "password123"}

Response:
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

---

## Protected Route Accessed With Valid Token
POST /api/reservations with a valid token in the Authorization header.

Header:
Authorization: Bearer <token>

Request body:
{"user_id": 1, "resource_id": 1, "start_time": "2025-03-01 10:00:00", "end_time": "2025-03-01 12:00:00"}

Response:
{"reservation_id": 1}

---

## Access Denied Due to Missing Role
POST /api/resources attempted by a user with role 'user' instead of 'admin'.

Header:
Authorization: Bearer <token>

Response:
{"error": "Access denied"}
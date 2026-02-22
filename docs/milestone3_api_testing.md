# Milestone 3 - API Testing

## Users

### POST /api/users
Creates a new user in the system.

Request body:
{
  "full_name": "John Doe",
  "email": "john@uni.edu",
  "role": "student"
}

### GET /api/users
Returns all users in the system.

---

## Resources

### POST /api/resources
Creates a new resource in the system.

Request body:
{
  "resource_name": "Study Room A",
  "resource_type": "room",
  "location": "Library 2nd Floor"
}

### GET /api/resources
Returns all available resources.

---

## Reservations

### POST /api/reservations
Creates a new reservation linking a user to a resource.

Request body:
{
  "user_id": 1,
  "resource_id": 1,
  "start_time": "2025-03-01 10:00:00",
  "end_time": "2025-03-01 12:00:00"
}

### GET /api/reservations
Returns all reservations in the system.
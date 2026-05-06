# Campus Resource Reservation API

## Project Overview

The Campus Resource Reservation API is a backend system that manages the reservation of campus resources such as study rooms and equipment. Users can register, log in, browse available resources, and create reservations. Administrators have additional access to create resources and manage the system. This is a backend-only project with no frontend — it is designed to be tested via Postman or any HTTP client.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | HTTP routing and middleware |
| MySQL | Relational database |
| mysql2 | MySQL client for Node.js |
| bcrypt | Password hashing |
| jsonwebtoken | JWT-based authentication |
| dotenv | Environment variable management |

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/gxrciafelipe/Campus-Resource-Reservation-API.git
cd Campus-Resource-Reservation-API
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables file and fill in your values:
```bash
cp .env.example .env
```

4. Initialize the database (see section below).

5. Start the server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

| Variable | Description |
|---|---|
| PORT | Port the server runs on (default: 3000) |
| DB_HOST | MySQL host (usually localhost) |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | Database name (campus_reservation) |
| JWT_SECRET | Secret key used to sign JWT tokens |

Example:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=campus_reservation
JWT_SECRET=somesecretkey
```

## Database Initialization Steps

1. Make sure MySQL is running.
2. Run the schema file:
```bash
mysql -u root -p < database/milestone2_schema.sql
```

This will create the `campus_reservation` database, create all tables, and insert sample data.

## Authentication Overview

This API uses JWT (JSON Web Token) authentication.

- Register a user via `POST /auth/register`
- Log in via `POST /auth/login` — you will receive a token
- Include the token in the `Authorization` header for all protected routes:
```
Authorization: Bearer <your_token>
```
- Tokens expire after **1 hour**
- Users with role `admin` can access admin-only endpoints like creating resources

## API Endpoint Summary

### Authentication
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /auth/register | No | Register a new user |
| POST | /auth/login | No | Login and receive a JWT token |

### Users
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/users | No | Returns all users (password excluded) |
| POST | /api/users | No | Creates a new user directly |

### Resources
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/resources | No | Returns all resources |
| POST | /api/resources | Yes (admin) | Creates a new resource |

### Reservations
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/reservations | No | Returns all reservations |
| POST | /api/reservations | Yes | Creates a new reservation |

## How to Run the Project Locally

1. Make sure MySQL is running on your machine.
2. Make sure your `.env` file exists with valid credentials.
3. Run the database schema if you haven't already:
```bash
mysql -u root -p < database/milestone2_schema.sql
```
4. Install dependencies and start:
```bash
npm install
npm start
```
5. Test the server is running:
```bash
curl http://localhost:3000/api/resources
```
You should get back a JSON array.

## Project Structure

```
src/
├── app.js                  # Express app setup
├── server.js               # Entry point
├── db.js                   # MySQL connection pool
├── config.js               # Centralized config and environment variables
├── middleware/
│   ├── authMiddleware.js   # JWT verification
│   ├── businessRules.js    # Reservation time and resource validation
│   ├── errorHandler.js     # Centralized error responses
│   ├── requestLogger.js    # Logs all incoming requests
│   ├── roleMiddleware.js   # Role-based access control
│   └── validateRequest.js  # Required field validation
└── routes/
    ├── auth.js             # /auth/register, /auth/login
    ├── reservations.js     # /api/reservations
    ├── resources.js        # /api/resources
    └── users.js            # /api/users
```
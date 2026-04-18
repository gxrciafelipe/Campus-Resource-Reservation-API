# Campus Resource Reservation API

## Project Description
The Campus Resource Reservation API is a backend system designed to manage the reservation of campus resources. It allows users to view available resources and create, update, or cancel reservations through API requests.

## Technologies Used
- Node.js
- Express.js
- MySQL
- mysql2
- bcrypt
- jsonwebtoken
- Git & GitHub

## How to Run Locally
1. Install dependencies:
```bash
    npm install
```
2. Configure your database connection in `src/config.js` with your MySQL credentials.
3. Make sure your MySQL server is running and the `campus_reservation` database exists.
4. Start the server:
```bash
    node src/server.js
```
5. The server will run at `http://localhost:3000`

## Project Structure
```
src/
├── app.js                      # Express app setup and middleware registration
├── server.js                   # Server entry point
├── db.js                       # MySQL connection pool
├── config.js                   # Centralized configuration (JWT secret, DB, port)
├── middleware/
│   ├── authMiddleware.js       # JWT token verification
│   ├── businessRules.js        # Reservation time and resource existence checks
│   ├── errorHandler.js         # Centralized error response handler
│   ├── requestLogger.js        # Logs every incoming request with timestamp
│   ├── roleMiddleware.js       # Role-based access control (e.g. admin only)
│   └── validateRequest.js      # Required field validation
└── routes/
    ├── auth.js                 # POST /auth/register, POST /auth/login
    ├── reservations.js         # GET/POST /api/reservations
    ├── resources.js            # GET/POST /api/resources
    └── users.js                # GET/POST /api/users
```

## API Endpoints

### Authentication
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /auth/register | No | Register a new user |
| POST | /auth/login | No | Login and receive a JWT token |

### Users
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | /api/users | No | Returns all users (excludes passwords) |
| POST | /api/users | No | Creates a new user |

### Resources
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | /api/resources | No | Returns all resources |
| POST | /api/resources | Yes (admin) | Creates a new resource |

### Reservations
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | /api/reservations | No | Returns all reservations |
| POST | /api/reservations | Yes | Creates a new reservation |

## Middleware Flow

Requests pass through middleware in this order:

1. **requestLogger** — logs every request before anything else runs
2. **express.json()** — parses request body
3. **auth** (on protected routes) — verifies JWT token before any business logic
4. **requireRole** (on admin routes) — checks user role after auth confirms identity
5. **validate** — checks that required fields are present before processing
6. **businessRules** — validates domain logic (e.g. time range, resource existence)
7. **route handler** — executes the database operation
8. **errorHandler** — catches any forwarded errors and sends a consistent JSON response

## Refinement and Optimization

### What Was Cleaned Up

**Centralized Configuration (`src/config.js`)**
The `JWT_SECRET` was previously hardcoded in two separate files (`auth.js` and `authMiddleware.js`). The database credentials were also hardcoded directly in `db.js`. All of these values are now defined once in `src/config.js` and imported wherever they are needed. This eliminates duplication and makes future changes (like rotating the secret or changing the database host) a one-line update.

**Fixed Misspelled Filename**
`bussinessRules.js` was renamed to `businessRules.js`. Misspelled filenames cause confusion and potential import errors on case-sensitive file systems.

**Removed Inline Validation from Route Handlers**
In `resources.js`, the `location` field was being validated with a manual `if (!location)` check inside the route handler body. This logic was moved into the `validate` middleware call at the route level, keeping handlers consistent and reducing the amount of logic inside handler functions.

**Added Error Handling to Auth Routes**
The `auth.js` routes were missing `try/catch` blocks. Any unhandled database error would crash the request without a proper response. All route handlers now forward errors to the centralized `errorHandler` via `next(err)`.

**Replaced `SELECT *` with Specific Columns**
All GET routes previously used `SELECT *`. Each route now selects only the columns the client actually needs. The users route explicitly excludes the `password` field. The `validateResourceExists` middleware was also updated to use `SELECT 1` since it only needs to confirm a row exists, not retrieve any data.

**Fixed `package.json` Start Script**
The `start` and `dev` scripts pointed to `src/app.js`, which does not start the server. They now correctly point to `src/server.js`.

### Why These Changes Matter

- **Maintainability**: A single place to update shared values like secrets and credentials means fewer bugs when things change.
- **Security**: Removing `SELECT *` from the users query ensures the hashed password field is never accidentally sent to a client.
- **Performance**: Using `SELECT 1 LIMIT 1` in existence checks avoids loading unnecessary data from the database.
- **Consistency**: All route handlers now follow the same pattern — validate first, then execute — making the codebase easier to read and extend.
- **Reliability**: Every async route handler is wrapped in `try/catch`, so all errors are routed to the centralized error handler instead of crashing silently.

## Current Status
Milestone 7 complete: Codebase refactored for clarity, maintainability, and efficiency. No new features added — focus was on improving code quality and structure.
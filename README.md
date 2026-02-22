# Campus Resource Reservation API

## Project Description
The Campus Resource Reservation API is a backend system designed to manage the reservation of campus resources. It allows users to view available resources and create, update, or cancel reservations through API requests.

## Technologies Used
- Node.js
- Express.js
- MySQL
- Git & GitHub

## How to Run Locally
1. Install dependencies:
    ```bash
    npm install
2. Configure your database connection in `src/db.js` with your MySQL credentials.
3. Make sure your MySQL server is running and the `campus_reservation` database exists.
4. Start the server:
    ```
    node src/server.js
    ```
5. The server will run at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Returns all users |
| POST | /api/users | Creates a new user |
| GET | /api/resources | Returns all resources |
| POST | /api/resources | Creates a new resource |
| GET | /api/reservations | Returns all reservations |
| POST | /api/reservations | Creates a new reservation |

## Current Status
Milestone 3 complete: RESTful API endpoints implemented for users, resources, and reservations. All endpoints interact with a MySQL database and return JSON responses.

## Project Scope
The Campus Resource Reservation API is a backend system responsible for managing reservations of shared campus resources. It provides a structured way for users to view resources and create, update, or cancel reservations through API requests.

The system manages resources such as study rooms, laboratory spaces, and campus equipment. Users will be able to check availability and make reservations for specific time slots using the API.

This project focuses only on backend functionality and does not include user authentication, frontend interfaces, payment processing, notifications, or administrative approval workflows.

## Technologies
This project uses the following technologies:
- Node.js as the runtime environment for the backend application
- Express.js to handle routing and HTTP requests
- MySQL as the relational database management system
- Git and GitHub for version control and project collaboration

Using a consistent set of technologies ensures that all project components work together reliably and predictably. In a course environment, standardizing tools helps reduce compatibility issues, simplifies debugging, and allows students to focus on learning core backend concepts rather than resolving tool conflicts. This approach reflects real-world backend development, where teams rely on agreed-upon technologies to maintain stability and efficiency.
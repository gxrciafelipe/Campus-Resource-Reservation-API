# Reflection – Felipe Garcia

## What I Learned About Backend Development

Before this project I understood the individual pieces, routing, databases, HTTP methods, but building a complete system showed me how they fit together. I learned how Express middleware executes in order and why that order matters, how a connection pool manages database access efficiently, and why separating concerns into controllers, routes, and middleware makes a codebase much easier to work with. I also came to understand the difference between authentication (proving who you are) and authorization (checking what you're allowed to do), which I now see as one of the most important concepts in backend design.

## What I Learned About Working with a Shared Codebase

Working in a shared repository taught me to write code as if someone else has to read it tomorrow, because they do. Commit messages, consistent naming, and logical file organization stopped feeling like extra work and started feeling necessary. I also learned that agreeing on patterns early (how errors are handled, how middleware is structured, where config lives) saves a lot of time later, because everyone's code fits together instead of pulling in different directions.

## One Technical Challenge I Solved

The hardest part was getting the middleware chain right for protected routes. Early on, errors were inconsistent; sometimes a missing token would crash the request instead of returning a clean 401. I traced it back to the error handler not being registered after the routes in `app.js`, and to some async route handlers missing `try/catch` blocks. Once I wrapped every async handler and made sure `next(err)` was always called on failure, errors started flowing to the centralized handler consistently.

## One Area I Would Improve With More Time

I would add conflict checking to reservations; right now nothing prevents two users from booking the same resource at the same time. The fix would be a query that checks for overlapping time ranges before inserting, similar to: `NOT (end_time <= ? OR start_time >= ?)`. I would also add automated tests so every endpoint could be verified without manually using Postman after each change.

## How This Project Represents My Skills Professionally

This project shows I can design and build a RESTful API from scratch using industry-standard tools. It demonstrates that I understand how to structure a Node.js project, connect to a relational database, implement JWT authentication with hashed passwords, and handle errors consistently. More than the technical side, it shows I can see a multi-week project through to completion, contribute to a shared codebase, and produce something another developer could pick up and run without asking me questions.
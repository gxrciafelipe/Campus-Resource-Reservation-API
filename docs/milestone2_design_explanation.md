# Milestone 2: Database Schema Design Explanation

## Entities I Designed
- Users: Stores people who can log in and make reservations.
- Resources: Stores reservable items like study rooms and equipment.
- Reservations: Connects users to resources and tracks booking times.

## Relationships
- A reservation connects to a user through user_id.
- A reservation connects to a resource through resource_id.
- This creates a many-to-one relationship from reservations to both users and resources.

## Assumptions
- Any registered user can reserve resources.
- Reservations must have a start and end time.
- Double booking is not allowed if times overlap.

## One Design Decision I Made


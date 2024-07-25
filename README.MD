# Chess Tournament Management System

## Setup Instructions

1. Install dependencies:
    ```bash
    npm install
    ```

2. Set up environment variables:
    ```bash
    cp .env.example .env
    ```

3. Run the application:
    ```bash
    npm start
    ```

4. API Documentation:
    - The documentation is created in Postman and is included in the Documentation file. Import it into Postman to access everything.

## Features
- Implemented login/register for users and added email verification (using cookies).
- Used Redis to verify the code sent during verification.
- Implemented CRUD operations for player management.
- Implemented CRUD operations for tournament management.
- Implemented CRUD operations for match management with automatic pairing.
- Added a leaderboard within the tournament, displaying the leaderboard for players participating in the tournament.

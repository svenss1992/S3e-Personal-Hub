# AGENTS.md

This file provides context and instructions for AI agents working on this repository.

## Project Overview

This is a "Personal Hub" monorepo containing:
-   **Client**: A React + Vite + Tailwind CSS v4 frontend application.
-   **Server**: A Node.js + Express + SQLite backend application.

## File Structure

-   `client/`: Frontend code.
-   `server/`: Backend code.
-   `server/database.sqlite`: The SQLite database file (ignored in git).
-   `server/init-db.js`: Script to initialize the database schema.

## Development Instructions

### Running the Project
To run the full stack, you need two terminal sessions:
1.  **Backend**: `cd server && node server.js`
2.  **Frontend**: `cd client && npm run dev`

### Database
-   The database is SQLite.
-   Schema changes should be reflected in `server/init-db.js`.
-   Always check `server/db.js` for database connection logic.

## Coding Standards

-   **Frontend**: Use functional React components and Hooks. Use Tailwind CSS for styling.
-   **Backend**: Keep routes and logic organized. Use async/await for database operations.
-   **Language**: The codebase uses English for variable names and comments, but the user prefers communication in Dutch.

## Verification

When making changes:
1.  Verify backend changes by restarting the server and testing endpoints (e.g., using curl or a script).
2.  Verify frontend changes by checking the build (`npm run build` in `client`) or checking for linting errors.
3.  Since there are no automated tests, **manual verification is crucial**.

## Important Files to Ignore
-   Do not commit `.env` files.
-   Do not commit `node_modules`.
-   Do not commit the SQLite database file.

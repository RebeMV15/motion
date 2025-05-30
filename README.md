# Motion Training Center Management System

A responsive web application for managing Motion training center's schedules, classes, and users.

## Features

- Daily schedule view with real-time updates
- Weekly class planner
- User management (trainers and clients)
- Session creation with dropdowns
- Responsive design using Tailwind CSS

## Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js
- Database: Google Sheets API

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Google Cloud Platform account with Sheets API enabled

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add your Google Sheets API credentials

4. Start the development servers:
   ```bash
   npm run dev
   ```

## Project Structure

```
motion-training-center/
├── frontend/           # React + Vite frontend
├── backend/           # Node.js backend
└── package.json       # Root package.json for workspace management
```

## Development

- Frontend runs on: http://localhost:5173
- Backend runs on: http://localhost:3000

## License

MIT 
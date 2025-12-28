# IP Geolocation Tracker - Frontend

React-based frontend for IP geolocation tracking application.

## Tech Stack

- React 18
- React Router DOM
- Vite
- Axios
- CSS3

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the API URL:

```
VITE_API_URL=http://localhost:3001/api
```

### 3. Run Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Features

### Authentication

- JWT-based authentication
- Auto-redirect based on auth state
- Persistent login via localStorage

### IP Geolocation

- Display current user's IP and location
- Search any IP address
- Input validation for IPv4 and IPv6
- Clear search to return to user's IP

### Search History

- Persisted search history per user
- Click history item to view details
- Single item deletion
- Multi-select deletion with checkboxes
- Timestamp display

## Design Principles

- Minimalist, clean UI
- Neutral color palette
- SVG icons only
- Responsive layout
- Clear error messaging
- No alerts - inline validation

## Project Structure

```
src/
├── components/       # React components
├── context/         # Auth context
├── services/        # API service layer
├── utils/           # Helper functions
└── main.jsx         # Entry point
```

## Test Credentials

- Email: `test@example.com`
- Password: `password123`

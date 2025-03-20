# MongoDB Next.js Task Management App

A full-stack task management application built with Next.js and MongoDB.

## Overview

This project is a task management application that allows users to create, read, update, and delete tasks. It uses Next.js for the frontend and API routes, with MongoDB as the database.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: (Add your auth solution if applicable)

## Project Structure

```
my-mongodb-app/
├── app/                   # Next.js App Router
│   ├── api/               # API endpoints
│   │   └── tasks/         # Tasks API
│   │       ├── [id]/      # Dynamic route for individual tasks
│   │       │   └── route.js  # GET, PUT, DELETE operations
│   │       └── route.js   # GET (list) and POST operations
│   ├── page.js            # Main page component
│   └── layout.js          # App layout component
├── lib/                   # Utility functions
│   └── mongodb.js         # MongoDB connection utility
├── models/                # Data models
│   └── Task.js            # Task model schema
├── testConnection.js      # test connection for mongodb connection           
├── public/                # Static assets
├── .env.local             # Environment variables
├── package.json           # Project dependencies
└── next.config.js         # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local installation or MongoDB Atlas account)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-mongodb-app.git
   cd my-mongodb-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a specific task
- `DELETE /api/tasks/:id` - Delete a specific task

## Database Schema

### Task

```javascript
{
  title: String,        // Task title
  description: String,  // Task description
  status: String,       // Task status (e.g., "pending", "in-progress", "completed")
  createdAt: Date,      // Creation timestamp
  updatedAt: Date       // Last update timestamp
}
```

## Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Import your repository to Vercel.
3. Configure environment variables in the Vercel dashboard.
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js Documentation
- MongoDB Documentation
- (Add any other resources or contributors)

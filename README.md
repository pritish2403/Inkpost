# Inkpost

A full-stack blogging platform where users can register, log in, create, edit, and view blogs with image uploads and genre filtering.

---

## Features
- User registration and authentication (JWT-based)
- Create, edit, and delete blog posts
- Upload blog images (Cloudinary integration)
- Filter blogs by genre
- View all blogs or only your own
- Responsive React frontend with protected routes
- Toast notifications and error boundaries

---

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, React Router, Framer Motion
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, Cloudinary
- **Other:** dotenv, bcryptjs

---

## Folder Structure
```
Inkpost/
  backend/    # Express + TypeScript API
  frontend/   # React + TypeScript client
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone <repo-url>
cd Inkpost
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env # Create your .env file (see below)
npm install
npm run dev # or npm run build && npm start
```

**.env example:**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000) and proxy API requests to the backend (default: http://localhost:5000).

---

## Usage
- Register a new account or log in.
- Create, edit, or delete your blogs.
- Upload images to blogs.
- Filter blogs by genre.
- View all blogs or just your own.

---

## API Endpoints (Summary)

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Log in and receive JWT

### Blogs
- `GET /api/blogs` — List all blogs
- `GET /api/blogs/:id` — Get blog by ID
- `POST /api/blogs` — Create a new blog (auth required)
- `PUT /api/blogs/:id` — Edit a blog (auth required)
- `DELETE /api/blogs/:id` — Delete a blog (auth required)


## Deployment
- Set environment variables as above on your server.
- Build frontend: `npm run build` in `frontend/` and serve `build/` folder.
- Start backend: `npm run build && npm start` in `backend/`.
- Use a process manager (e.g., PM2) and a reverse proxy (e.g., Nginx) for production.

---

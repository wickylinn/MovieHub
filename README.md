# 🎬 MovieHub

MovieHub is a full-stack movie web application where users can discover movies, watch trailers, rate films, and write reviews.

The project was built as a full-stack web application using React and Node.js with a focus on clean UI, responsive design, and REST API architecture.

---

## 🌐 Live Demo

👉 https://moviehub-v1yo.onrender.com/

---

## ✨ Features

- 🔎 Browse and search movies
- ⭐ Rate movies
- 💬 Create and read reviews
- 🎞 Watch movie trailers (YouTube embed)
- 👤 User authentication (Register / Login)
- 🔐 JWT-based authorization
- 📱 Fully responsive mobile layout
- ⚡ Fast client-side routing

---

## 🏗 Architecture

The project follows a classic full-stack architecture:

Client (React + Vite)
│
▼
REST API (Node.js + Express)
│
▼
MongoDB Atlas

- Frontend communicates with backend via REST API
- Backend handles authentication, validation and database logic
- MongoDB stores users, movies and reviews

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Custom CSS (responsive layout)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Deployment
- Frontend: Render (Static Site)
- Backend: Render (Web Service)
- Database: MongoDB Atlas

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone repository

```bash
git clone https://github.com/wickylinn/MovieHub.git
cd MovieHub
```
### 2️⃣ Backend setup

```bash
cd backend
npm install
```
### Create .env file:

- PORT=5000
- MONGO_URI=your_mongodb_connection
- JWT_SECRET=your_secret_key

### Run backend:

```bash
npm start
```
### Backend runs on: http://localhost:5000

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### Frontend runs on: http://localhost:5173

## 🌍 Environment Variables
### Backend

| Variable | Description |
|---|---|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT authentication |
| PORT | Server port |

### Frontend

| Variable | Description |
|---|---|
| VITE_API_URL | Backend API base URL |

## 📡 API Overview
### Auth
```bash
POST /api/auth/register
POST /api/auth/login
```
### Movies
```bash
GET /api/movies
GET /api/movies/:id
```
### Reviews
```bash
GET /api/reviews/:movieId
POST /api/reviews/:movieId
```

### 📱 Responsive Design
The UI is optimized for:
- Desktop
- Tablet
- Mobile devices

Layout adapts dynamically using CSS Grid and Flexbox.

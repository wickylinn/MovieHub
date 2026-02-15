# MovieHub - Team Big Boys

Final course project. MovieHub is a web application for browsing movies, watching trailers, rating movies, and writing reviews.

# Tech Stack
Frontend
1.React
2.React Router
3.Axios
4.Vite

Backend
1.Node.js
2.Express
3.MongoDB
4.Mongoose
5.JWT Authentication

# Installation & Run
Backend (runs on http://localhost:5000)
From project root: npm run dev

Frontend (runs onhttp://localhost:5173)
To run: cd frontend
npm run dev

# API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Movies
GET    /api/movies
GET    /api/movies/:id
POST   /api/movies        (admin)
PUT    /api/movies/:id    (admin)
DELETE /api/movies/:id    (admin)

Reviews
GET    /api/reviews/:movieId
POST   /api/reviews/:movieId

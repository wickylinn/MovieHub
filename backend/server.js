const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const movieRoutes = require("./routes/movie.routes.js");
const reviewRoutes = require("./routes/review.routes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server running on', PORT))

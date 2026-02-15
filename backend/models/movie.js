const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, default: "" },

    genre: { type: [String], default: [] }, // <-- ВАЖНО: массив

    releaseDate: { type: Date },            // <-- из твоего JSON
    duration: { type: Number },             // <-- из твоего JSON
    posterUrl: { type: String, default: "" },
    trailerUrl: { type: String, default: "" },

    year: { type: Number },

    averageRating: { type: Number, default: 0 }
  },
  { timestamps: true } // createdAt / updatedAt автоматически
);

module.exports = mongoose.model("Movie", movieSchema);

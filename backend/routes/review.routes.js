const router = require("express").Router();
const Review = require("../models/review.js");
const Movie = require("../models/movie.js");
const auth = require("../middleware/auth.middleware.js");

router.post('/:movieId', auth, async (req, res) => {
  const { rating, comment } = req.body
  const userId = req.user.id
  const movieId = req.params.movieId

  let review = await Review.findOne({ user: userId, movie: movieId })

  if (review) {
    review.rating = rating
    review.comment = comment
    await review.save()
  } else {
    review = await Review.create({
      user: userId,
      movie: movieId,
      rating,
      comment
    })
  }

  const reviews = await Review.find({ movie: movieId })
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  await Movie.findByIdAndUpdate(movieId, {
    averageRating: avg.toFixed(1)
  })

  res.json(review)
});


router.get("/:movieId", async (req, res) => {
  const reviews = await Review.find({ movie: req.params.movieId })
    .populate("user", "username");
  res.json(reviews);
});

router.put("/:id", auth, async (req, res) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(review);
});

router.delete("/:id", auth, async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
});

module.exports = router;

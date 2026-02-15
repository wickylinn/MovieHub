const router = require("express").Router();
const Movie = require("../models/movie.js");
const auth = require("../middleware/auth.middleware.js");
const admin = require('../middleware/role.middleware.js')

router.post('/', auth, admin, async (req, res) => {
  const movie = await Movie.create(req.body)
  res.status(201).json(movie)
})


router.get('/', async (req, res) => {
  try {
    const { search, genre, sort } = req.query

    let query = {}

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    if (genre) {
      query.genre = genre
    }

    let moviesQuery = Movie.find(query)

    if (sort === 'year') {
      moviesQuery = moviesQuery.sort({ year: -1 })
    }

    const movies = await moviesQuery
    res.json(movies)

  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

router.put("/:id", auth, admin, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(movie);
});

router.delete("/:id", auth, admin, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
});

module.exports = router;

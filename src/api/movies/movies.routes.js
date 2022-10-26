const express = require("express");
const Movie = require("../../models/movie");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
    return res.status(200).json(allMovies);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movieToFind = await Movie.findById(id);
    console.log(movieToFind);
    return res.status(200).json(movieToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const movie = req.body;
    const newMovie = new Movie(movie);
    const created = await newMovie.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear los datos");
  }
});

module.exports = router;

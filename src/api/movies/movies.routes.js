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
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movieToDelete = await Movie.findByIdAndDelete(id);
    console.log(movieToDelete);
    return res.status(200).json("Se ha conseguido borrar la peli");
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    const movieModify = new Movie(movie);
    movieModify._id = id;
    const movieUpdated = await Movie.findByIdAndUpdate(id, movieModify);
    return res
      .status(200)
      .json({
        mensaje: "Se ha conseguido editar la peli",
        movieModificado: movieUpdated,
      });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

import sanitize from "mongo-sanitize";
import { getMoviesFromMongo, getMovieFromMongo, postMovieToMongo, updateMovieOnMongo, deleteMovieOnMongo } from "../models/movie.js";
import generatePosterAltDescriptionWithGemini from "../services/gemini_service.js";

export async function returnMovies(req, res) {
  const movies = await getMoviesFromMongo();
  const responseArray = await movies.toArray();
  console.log(responseArray.length);
  res.status(200).json(responseArray);
}

export async function returnMovie(req, res) {
  const movieId = req.params.id;
  const movie = await getMovieFromMongo(movieId);
  console.log(movie);
  // perhaps handle 404
  res.status(200).json(movie);
};

export async function createMovie(req, res) {
  try {
    let newMovie = sanitize(req.body);
    let posterFile = req.file;

    if (posterFile) {
      console.log(posterFile);
      newMovie.poster = `uploads/${posterFile.filename}`;
      newMovie.poster_alt = await generatePosterAltDescriptionWithGemini(posterFile.path, posterFile.mimetype);
    }
    const createdMovie = await postMovieToMongo(newMovie);
    res.status(200).send(createdMovie);
  } catch (e) {
    console.error(e);
    res.status(500).send({ 'error': 'Something went wrong' });
  }
}

export async function updateMovie(req, res) {
  const movieId = req.params.id;
  try {
    const movieParams = sanitize(req.body);
    const updatedMovie = await updateMovieOnMongo(movieId, movieParams);
    res.status(200).send(updatedMovie);
  } catch (e) {
    console.error(e);
    res.status(500).send({ 'error': 'Something went wrong' });
  }
}

export async function deleteMovie(req, res) {
  const movieId = req.params.id;
  try {
    const deletedMovie = await deleteMovieOnMongo(movieId);
    res.status(200).send(deletedMovie);
  } catch (e) {
    console.error(e);
    res.status(500).send({ 'error': 'Something went wrong' });
  }
}
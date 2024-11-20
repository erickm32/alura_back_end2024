import { getMoviesFromMongo, getMovieFromMongo } from "../models/movie.js";

export async function returnMovies(req, res) {
  const movies = getMoviesFromMongo()
  res.status(200);
  const responseArray = await movies.toArray();
  console.log(responseArray.length);
  res.json(responseArray);
}

export async function returnMovie(req, res) {
  res.status(200);
  const movieId = req.params.id;
  const movie = await getMovieFromMongo(movieId);
  console.log(movie);
  res.json(movie);
};

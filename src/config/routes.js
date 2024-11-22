import { returnMovies, returnMovie, createMovie, updateMovie, deleteMovie } from "../controllers/movies_controller.js";

export default async function setRoutes(app) {
  app.get('/movies', returnMovies);
  app.get('/movies/:id', returnMovie);
  app.post('/movies', createMovie);
  app.patch('/movies/:id', updateMovie);
  app.delete('/movies/:id', deleteMovie);
}
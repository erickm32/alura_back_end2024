import { returnMovies, returnMovie } from "../controllers/movies_controller.js";

export default async function setRoutes(app) {
  app.get('/movies', returnMovies);
  app.get('/movies/:id', returnMovie);
}
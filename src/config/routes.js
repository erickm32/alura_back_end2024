import multer from 'multer';
import { returnMovies, returnMovie, createMovie, updateMovie, deleteMovie } from "../controllers/movies_controller.js";

export default async function setRoutes(app) {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });

  const multerUpload = multer({ storage: storage });

  app.get('/movies', returnMovies);
  app.get('/movies/:id', returnMovie);
  app.post('/movies', multerUpload.single('poster'), createMovie);
  app.patch('/movies/:id', updateMovie);
  app.delete('/movies/:id', deleteMovie);
}
import express from "express";
import movieControllers from "../controller/movieControllers.js";
import { multerMiddleware } from "../middlewares/multer.js";
import { adminAuthorization } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/movies/title", movieControllers.getMoviesByTitle);
router.get("/movies?", movieControllers.getAllMovies);
router.get("/movies/:id", movieControllers.getMoviesById);

router.post(
  "/movies/post",
  adminAuthorization,
  multerMiddleware,
  movieControllers.createMovies
);
router.put(
  "/movies/update/:id",
  adminAuthorization,
  multerMiddleware,
  movieControllers.updateMovies
);
router.delete(
  "/movies/delete/:id",
  adminAuthorization,
  movieControllers.deleteMovies
);

export default router;

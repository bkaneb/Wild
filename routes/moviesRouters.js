const moviesRouter = require("express").Router();
const MoviesControllers = require('../controllers/moviesController');

moviesRouter.get("/api/movies", MoviesControllers.selectAll);

moviesRouter.get("/api/movies/:id", MoviesControllers.selectOne);

moviesRouter.post("/api/movies", MoviesControllers.insert);

moviesRouter.put("/api/movies/:id", MoviesControllers.update);

moviesRouter.delete("/api/movies/:id", MoviesControllers.delete);

module.exports = moviesRouter;

const MoviesModels = require("../models/moviesModel");

exports.selectAll = async (req, res) => {
  const color = req.query.color;
  const max_duration = req.query.max_duration;
  try {
    const [result] = await MoviesModels.findMany({
      filters: { color, max_duration },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving data from database");
  }
};

exports.selectOne = async (req, res) => {
  const moviesID = req.params.id;
  try {
    const [result] = await MoviesModels.findOne({
      filters: { moviesID },
    });
    if (result.length) {
      res.json(result[0]);
    } else {
      res.status(404).send("movie not found");
    }
  } catch (err) {
    res.status(500).send("Error retrieving data from database");
  }
};

exports.insert = async (req, res) => {
  let error = null;
  try {
    error = MoviesModels.validate(req.body);
    try {
      await MoviesModels.create(req.body).then((createMovies) => {
        res.status(201).send(createMovies);
      });
    } catch (err) {
      res.status(500).send("Error saving the movie");
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ validationErrors: error });
  }
};

exports.update = async (req, res) => {
  let existingMovie = null;
  let validationErrors = null;
  const moviesID = req.params.id;
  try {
    await MoviesModels.findOne({ filters: { moviesID } }) // recherche le film de l'id donné
      .then(async (movie) => {
        // si on le trouve on continue sinon catch
        existingMovie = movie; //verification si il n'y a pas d'erreur
        if (!existingMovie) return Promise.reject("RECORD_NOT_FOUND");
        validationErrors = MoviesModels.validate(req.body, false);
        if (validationErrors) return Promise.reject("INVALID_DATA");
        return await MoviesModels.update(req.params.id, req.body);
      }) // si tout est bon on est envoie les parametres recus
      .then(() => {
        res.status(200).json({ id: moviesID, ...req.body });
      });
  } catch (err) {
    console.error(err);
    if (err === "RECORD_NOT_FOUND")
      res.status(404).send(`Movie with id ${req.params.id} not found.`);
    else if (err === "INVALID_DATA")
      res.status(422).json({ validationErrors: validationErrors.details });
    else res.status(500).send("Error updating a movie.");
  }
};

exports.delete = async (req, res) => {
  const moviesID = req.params.id;
  try{
     await MoviesModels.destroy(moviesID);
     res.status(201).send("Movie successfully delete");
  } catch(err) {
    console.log(err);
    res.status(500).send("Error delete the movie");
  }
};

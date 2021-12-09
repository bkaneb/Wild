const UsersModel = require("../models/usersModel");

exports.selectAll = async (req, res) => {
  const language = req.query.language;
  try {
    const [results] = await UsersModel.findMany({ filters: { language } });
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send("Error retrieving data from database");
  }
};

exports.selectOne = async (req, res) => {
  const usersID = req.params.id;
  try {
    const [results] = await UsersModel.finOne({ filters: { usersID } });
    if (results.length) {
      res.json(results[0]);
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    res.status(500).send("Error retrieving data from database");
  }
};

exports.insertion = async (req, res) => {
  let error = null;
  const { email } = req.body;
  try {
    await UsersModel.verifmail({ filters: { email } }).then(async (user) => {
      if (user) {
        return Promise.reject("DUPLICATE_EMAIL");
      }
      error = UsersModel.validate(req.body);
      if(error) return Promise.reject("INVALID_DATA");
      await UsersModel.create(req.body).then((createMovies) => {
        res.status(201).send(createMovies);
      });
    });
  } catch (err) {
    console.log(err);
    if (err === "INVALID_DATA") res.status(422).send(error.details[0].message);
    else if (err === "DUPLICATE_EMAIL")
      res.status(409).json({ message: "This email is already used" });
    else res.status(500).send("Error saving the movie");
  }
};

exports.update = async (req, res, next) => {
  const usersID = req.params.id;
  const email = req.body.email;
  let existingUser = null;
  let error = null;
  // permet de faire plusieurs requête dans la même promesse
  try {
    await UsersModel.finOne({ filters: { usersID } })
      .then(async (user) => {
        existingUser = user;
        if (!existingUser) {
          return Promise.reject("RECORD_NOT_FOUND");
        }
        const otherUserWithEmail = await UsersModel.verifmail({
          filters: { email, usersID },
        });
        if (otherUserWithEmail[0].length > 0) {
          return Promise.reject("DUPLICATE_EMAIL");
        }
        error = UsersModel.validate();
        if(error) return Promise.reject("INVALID_DATA");
        return await UsersModel.update(req.params.id, req.body);
      })
      .then(() => {
        res.status(200).json({ id: usersID, ...req.body });
      });
    next();
  } catch (err) {
    console.log(err);
    if (err === "INVALID_DATA") res.status(422).send(error.details[0].message);
    else  if (err === "DUPLICATE_EMAIL")
      res.status(409).json({ message: "This email is already used" });
    else if (err === "RECORD_NOT_FOUND")
      res.status(404).send(`Movie with id ${req.params.id} not found.`);
    else res.status(500).send("Error updating a user");
  }
  next();
};

exports.delete = async (req, res) => {
  const usersID = req.params.id;
  try {
    await UsersModel.destroy(usersID);
    res.status(201).send("User successfully delete");
  } catch (err) {
    res.status(500).send("Error delete the user");
  }
};

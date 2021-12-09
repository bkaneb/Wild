const { connection } = require("../config/db-config");
const Joi = require("joi");
const argon2 = require("argon2");

// configuration hachage

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// renvoie le mdp haché

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

// renvoie la reponse (true/false) du mdp haché comparé au mdp réel

exports.verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

exports.validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    firstname: Joi.string().max(255).presence(presence),
    lastname: Joi.string().max(255).presence(presence),
    city: Joi.string().max(255).presence(presence),
    language: Joi.string().max(255).presence(presence),
    password: Joi.string().min(8).max(255).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

exports.findMany = ({ filters: { language } }) => {
  let sql = "SELECT * FROM users";
  // (module mysql2)stockage des valeurs pour les passer en à la requête
  const sqlValues = [];
  // si on à un parametre rentrer
  if (language) {
    // rajout du WHERE & ? est un espace réservé et ne pas oublier l'espace
    sql += " WHERE language = ?";
    // rajout des valeurs
    sqlValues.push(language);
  }
  return connection.promise().query(sql, sqlValues);
};

exports.finOne = ({ filters: { usersID } }) => {
  return connection
    .promise()
    .query("SELECT * FROM users WHERE id = ?", [usersID]);
};

exports.create = async ({
  firstname,
  lastname,
  email,
  city,
  language,
  password,
}) => {
  //permettra d'haser le mdp
  if(password.length >= 8){
    return hashPassword(password).then(async (hashedPassword) => {
    const [result] = await connection
      .promise()
      .query(
        "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language, hashedPassword]
      );
    const id = result.insertId;
    return { id, firstname, lastname, email, city, language, hashedPassword };
  });
  }

};

exports.verifmail = async ({ filters: { email, usersID } }) => {
  if (!usersID) {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    return results[0];
  } else {
    const [results_1] = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ? AND id <> ?", [
        email,
        usersID,
      ]);
    return results_1[0];
  }
};

exports.update = (id, newAttributes) => {
  return connection
    .promise()
    .query("UPDATE users SET ? WHERE id = ?", [newAttributes, id]);
};

exports.destroy = ({ usersID }) => {
  return connection.promise().query("DELETE FROM users WHERE id=?", [usersID]);
};

const { connection } = require("../config/db-config");
const Joi = require("joi");

exports.validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    firstname: Joi.string().max(255).presence(presence),
    lastname: Joi.string().max(255).presence(presence),
    city: Joi.string().max(255).presence(presence),
    language: Joi.string().max(255).presence(presence),
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

exports.create = async ({ firstname, lastname, email, city, language }) => {
  const [result] = await connection
    .promise()
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    );
  const id = result.insertId;
  return { id, firstname, lastname, email, city, language };
};

exports.verifmail = ({ filters: { email, usersID } }) => {
  if (usersID != null) {
    return connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
  } else {
    return connection
      .promise()
      .query("SELECT * FROM users WHERE email = ? AND id <> ?", [
        email,
        usersID,
      ]);
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

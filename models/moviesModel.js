const { connection } = require("../config/db-config");
const Joi = require("joi");

exports.validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    title: Joi.string().max(255).presence(presence),
    director: Joi.string().max(255).presence(presence),
    year: Joi.number().integer().min(1888).presence(presence),
    color: Joi.boolean().presence(presence),
    duration: Joi.number().integer().min(1).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

exports.findMany = ({ filters: { color, max_duration } }) => {
  let sql = "SELECT * FROM movies";
  const sqlValues = [];
  if (color && max_duration) {
    sql += " WHERE duration <= ? AND color = ?";
    sqlValues.push(max_duration, color);
  } else {
    if (color) {
      sql += " WHERE color = ?";
      sqlValues.push(color);
    }
    if (max_duration) {
      sql += " WHERE duration <= ?";
      sqlValues.push(max_duration);
    }
  }
  return connection.promise().query(sql, sqlValues);
};

exports.findOne = ({ filters: { moviesID } }) => {
  return connection
    .promise()
    .query("SELECT * FROM movies WHERE id = ?", moviesID);
};


exports.create = async ({ title, director, year, color, duration, user_id }) => {
  const [result] = await connection
    .promise()
    .query(
      "INSERT INTO movies(title, director, year, color, duration, user_id) VALUES (?,?,?,?,?,?)",
      [title, director, year, color, duration, user_id]
    );
  const id = result.insertId;
  return { id, title, director, year, color, duration };
};

exports.update = (id, newAttributes) => {
  return connection
    .promise()
    .query("UPDATE movies SET ? WHERE id = ?", [newAttributes, id]);
};

exports.destroy = (moviesID) => {
  return connection
    .promise()
    .query("DELETE FROM movies WHERE id = ?", [moviesID]);
};

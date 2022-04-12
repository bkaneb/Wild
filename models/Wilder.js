const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//créaction table(document)
const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

module.exports = mongoose.model("wilder", WilderSchema);
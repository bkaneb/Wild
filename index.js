//server.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

//database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const setupRoutes = require("./routes");
setupRoutes(app);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(3000, () => console.log("Server started on 3000"));

const express = require("express");
const app = express();
app.use(express.json()); // permet de receptionner du json
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.env.PORT || 3002;
const setupRoutes = require("./routes/routes");

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

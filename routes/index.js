const WildersRouters = require("./wildersRouters");

const setupRoutes = (app) => {
  app.use("/api/wilder", WildersRouters);
};

module.exports = setupRoutes;

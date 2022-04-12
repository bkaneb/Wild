import { Express } from "express";
import WildersRouters from "./wildersRouters";

const setupRoutes = (app : Express) : void => {
  app.use("/api/wilder", WildersRouters);
};

export default setupRoutes;

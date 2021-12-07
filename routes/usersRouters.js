const usersRouter = require("express").Router();
const { connection } = require('../config/db-config');
const UsersControllers = require('../controllers/usersControllers');

usersRouter.get("/api/users", UsersControllers.selectAll);

usersRouter.get("/api/users/:id", UsersControllers.selectOne);

usersRouter.post("/api/users", UsersControllers.insertion);

usersRouter.put("/api/users/:id", UsersControllers.update);

usersRouter.delete("/api/users/:id", UsersControllers.delete);

module.exports = usersRouter;

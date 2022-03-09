const wildersRouter = require("express").Router();
const WilderController = require("../controllers/Wilder");
const { CheckIdExist } = require('../middlewares');

wildersRouter.get("/", WilderController.findAll);
wildersRouter.post("/", WilderController.create);
wildersRouter.put("/:id", CheckIdExist.findOne, WilderController.updateOne);
wildersRouter.delete("/:id", CheckIdExist.findOne, WilderController.destroyOne);

module.exports = wildersRouter;

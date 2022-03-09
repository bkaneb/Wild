const WilderModel = require("../models/Wilder");

exports.findOne = async (req, res, next) => {
  try {
    const data = await WilderModel.findById(req.params.id);
    if (data) return next();
    return res.status(404).send({
      success: false,
      message: "Wilder not found",
    });
  } catch (err) {
    return res
      .status(404)
      .send({ success: false, message: "The length of the id is not correct !" });
  }
};

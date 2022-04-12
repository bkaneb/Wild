import { Request, Response, NextFunction } from "express";

import WilderModel from "../models/Wilder";

const findOne = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const data = await WilderModel.findById(req.params.id);
    if (data) return next();
    return res.status(404).send({
      success: false,
      message: "Wilder not found",
    });
  } catch (err : unknown) {
    return res
      .status(404)
      .send({ success: false, message: "The length of the id is not correct !" });
  }
};

export default { findOne };

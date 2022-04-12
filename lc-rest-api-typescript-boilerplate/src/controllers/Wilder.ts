import { Request, Response} from "express";
import WilderModel from "../models/Wilder";

const findOne = async (req : Request, res : Response) => {
  try {
    const data = await WilderModel.findById(req.params.id);
    return res.status(200).send({ success: true, result: data });
  } catch (err : unknown) {
    return res.status(500).send({
      success: false,
      error: err,
    });
  }
};

const findAll = async (req : Request, res : Response) => {
  try {
    const data = await WilderModel.find();
    return res.status(200).send({ success: true, result: data });
  } catch (err : unknown) {
    return res.status(500).send({
      success: false,
      error: err,
    });
  }
  /* 
      WilderModel.find()
        .then((data) => {
          res.status(200).send({ success: true, result: data });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            error: err,
          });
        });
 */
};

const create = async (req : Request, res : Response) => {
  try {
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    return res.status(201).send({ success: true, result: result });
  } catch (err : unknown) {
    return res.status(500).send({ success: false, result: err });
  }
};

const updateOne = async (req : Request, res : Response) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        success: false,
        message: "Data to update can not be empty !",
      });
    }
    const data = await WilderModel.findByIdAndUpdate(req.params.id, req.body);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "The data for the wilder is empty !",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Wilder was updated successfully !",
    });
  } catch (err : unknown) {
    return res.status(500).send({ success: false, result: err });
  }
  /*     if (!req.body) {
    return res.status(400).send({
      success: false,
      message: "Data to update can not be empty !",
    });
  }
      WilderModel.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              success: false,
              message: "The data for the wilder is empty !",
            });
          }
          return res.status(200).send({
            success: true,
            message: "Wilder was updated successfully !",
          });
        })
        .catch((err) => {
          res.status(500).send({ success: false, result: err });
        }); */
};

const destroyOne = async (req : Request, res : Response) => {
  try {
    const data = await WilderModel.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).send({
        success: false,
        message: "The data for the wilder is empty !",
      });
    }
    return res.sendStatus(204);
  } catch (err : unknown) {
    return res.status(500).send({ success: false, result: err });
  }
  /*  
      WilderModel.findByIdAndDelete(req.params.id)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              success: false,
              message: "The data for the wilder is empty !",
            });
          }
          return res.status(204).send({
            success: true,
            message: "Wilder was deleted successfully !",
          });
        })
        .catch((err) => {
          res.status(500).send({ success: false, result: err });
        });
 */
};

module.exports = { create, findAll, updateOne, destroyOne, findOne };

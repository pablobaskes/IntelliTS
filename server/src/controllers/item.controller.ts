import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import {
  deleteAllCars,
  deleteCarById,
  getAllCars,
  getCarById,
  insertCar,
  updateCarById,
} from "../services/item.services";
import { ReqExtended } from "../interfaces/ReqExtended.interface";
const postItem = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const responseItem = await insertCar(body);
    res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_CREATE_ITEM", e);
  }
};

const deleteItems = async (req: Request, res: Response): Promise<any> => {
  try {
    const deleteResult = await deleteAllCars();
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_ITEMS", e);
  }
};

const getItems = async (req: ReqExtended, res: Response) => {
  try {
    const cars = await getAllCars();
    res.send({ cars, user: req.user });
  } catch (e) {
    handleHttp(res, "ERROR_GET_ITEMS", e);
  }
};

const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await getCarById(id);
    res.send(car);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ITEM", e);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedCar = await updateCarById(id, body);
    res.send(updatedCar);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_ITEM", e);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteResult = await deleteCarById(id);
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_ITEM", e);
  }
};

export { postItem, deleteItems, getItems, getItem, updateItem, deleteItem };

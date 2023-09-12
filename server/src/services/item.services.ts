import { Car } from "../interfaces/car.interface";
import { ItemModel } from "../models/item.model";

const insertCar = async (item: Car) => {
  const car = await ItemModel.create(item);
  return car;
};

const deleteAllCars = async () => {
  const deleteResult = await ItemModel.deleteMany({});
  return deleteResult;
};

const getAllCars = async () => {
  const cars = await ItemModel.find({});
  return cars;
};

const getCarById = async (id: string) => {
  const car = await ItemModel.findById(id);
  return car;
};

const updateCarById = async (id: string, carData: Car) => {
  const updatedCar = await ItemModel.findByIdAndUpdate(id, carData, {
    new: true,
  });
  return updatedCar;
};

const deleteCarById = async (id: string) => {
  const deleteResult = await ItemModel.findByIdAndDelete(id);
  return deleteResult;
};

export {
  insertCar,
  deleteAllCars,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
};

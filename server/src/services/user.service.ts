import { User } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

const deleteAllUsers = async () => {
  const deleteResult = await UserModel.deleteMany({});
  return deleteResult;
};

const getAllUsers = async () => {
  const users = await UserModel.find({});
  return users;
};

const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

const updateUserById = async (id: string, userData: User) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
  });
  return updatedUser;
};

const deleteUserById = async (id: string) => {
  const deleteResult = await UserModel.findByIdAndDelete(id);
  return deleteResult;
};

export {
  deleteAllUsers,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

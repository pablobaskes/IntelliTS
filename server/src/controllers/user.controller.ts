import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import {
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../services/user.service";
import { ReqExtended } from "../interfaces/ReqExtended.interface";

const deleteUsers = async (req: Request, res: Response) => {
  try {
    const deletedUsers = await deleteAllUsers();
    res.send(deletedUsers);
  } catch (e) {
    handleHttp(res, "ERROR_REMOVE_USERS", e);
  }
};

const getUsers = async (req: ReqExtended, res: Response) => {
  try {
    const users = await getAllUsers();
    res.send({ users, user: req.user });
  } catch (e) {
    handleHttp(res, "ERROR_GET_USERS", e);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send(user);
  } catch (e) {
    handleHttp(res, "ERROR_GET_USER", e);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await updateUserById(id, body);
    res.send(updatedUser);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_USER", e);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteResult = await deleteUserById(id);
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_USER", e);
  }
};

export { getUsers, getUser, updateUser, deleteUser, deleteUsers };

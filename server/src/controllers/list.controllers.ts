import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import {
  deleteAllLists,
  deleteListById,
  getAllLists,
  getAllListsOfUser,
  getListById,
  insertList,
  updateListById,
} from "../services/list.services";

const postList = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const responseList = await insertList(body);
    res.send(responseList);
  } catch (e) {
    handleHttp(res, "ERROR_CREATE_LIST", e);
  }
};

const deleteLists = async (req: Request, res: Response) => {
  try {
    const deleteResult = await deleteAllLists();
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_LISTS", e);
  }
};

const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await getAllLists();
    res.send(lists);
  } catch (e) {
    handleHttp(res, "ERROR_GET_LISTS", e);
  }
};

const getList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await getListById(id);
    res.send(list);
  } catch (e) {
    handleHttp(res, "ERROR_GET_LIST", e);
  }
};
const getUserLists = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const lists = await getAllListsOfUser(userId);
    res.send(lists);
  } catch (e) {
    const error = e as Error;
    handleHttp(res, "ERROR_GET_USER_LISTS", error);
  }
};


const updateList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedList = await updateListById(id, body);
    res.send(updatedList);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_LIST", e);
  }
};

const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteResult = await deleteListById(id);
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_LIST", e);
  }
};

export { postList, deleteLists, getLists, getList, updateList, deleteList, getUserLists };

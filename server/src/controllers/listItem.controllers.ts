import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import {
  deleteAllListItems,
  deleteListItemById,
  getAllListItems,
  getAllListItemsOfList,
  getListItemById,
  insertListItem,
  updateListItemById,
} from "../services/ListItem.services";

const postListItem = async (req: Request, res: Response) => {
  try {
    const { listId, movieId } = req.body;

    const listItem = await insertListItem({ listId, movieId });
    res.send(listItem);
  } catch (e) {
    const error = e as Error;
    if (error.message === 'Movie already exists in the list') {
      return res.status(400).send({ error: 'Movie already exists in the list' });
    }
    handleHttp(res, "ERROR_CREATE_LIST_ITEM", error);
  }
};


const deleteListItems = async (req: Request, res: Response) => {
  try {
    const deleteResult = await deleteAllListItems();
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_LISTITEMS", e);
  }
};

const getListItems = async (req: Request, res: Response) => {
  try {
    const listItems = await getAllListItems();
    res.send(listItems);
  } catch (e) {
    handleHttp(res, "ERROR_GET_LISTITEMS", e);
  }
};

const getListItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listItem = await getListItemById(id);
    res.send(listItem);
  } catch (e) {
    handleHttp(res, "ERROR_GET_LISTITEM", e);
  }
};
const getListItemsOfAList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.listId; // Assuming you pass listId as a route parameter
    const listItems = await getAllListItemsOfList(listId);
    res.send(listItems);
  } catch (e) {
    const error = e as Error;
    handleHttp(res, "ERROR_GET_LIST_ITEMS", error);
  }
};

const updateListItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedListItem = await updateListItemById(id, body);
    res.send(updatedListItem);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_LISTITEM", e);
  }
};

const deleteListItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteResult = await deleteListItemById(id);
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_LISTITEM", e);
  }
};

export {
  postListItem,
  deleteListItems,
  getListItems,
  getListItem,
  updateListItem,
  deleteListItem,
  getListItemsOfAList
};

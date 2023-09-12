import { List } from "../interfaces/lists.interface";
import { ListModel } from "../models/List.model";


const insertList = async (list: Partial<List>) => {
  const newList = await ListModel.create(list);
  return newList;
};

const deleteAllLists = async () => {
  const deleteResult = await ListModel.deleteMany({});
  return deleteResult;
};

const getAllLists = async () => {
  const lists = await ListModel.find({});
  return lists;
};

const getAllListsOfUser = async (userId: string) => {
  const lists = await ListModel.find({ userId });
  return lists;
};


const getListById = async (id: string) => {
  const list = await ListModel.findById(id);
  return list;
};

const updateListById = async (id: string, listData: List) => {
  const updatedList = await ListModel.findByIdAndUpdate(id, listData, {
    new: true,
  });
  return updatedList;
};

const deleteListById = async (id: string) => {
  const deleteResult = await ListModel.findByIdAndDelete(id);
  return deleteResult;
};

export {
  insertList,
  deleteAllLists,
  getAllLists,
  getListById,
  updateListById,
  deleteListById,
  getAllListsOfUser
};

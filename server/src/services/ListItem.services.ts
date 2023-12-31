import { ListItem } from "../interfaces/lists.interface";
import { ListModel } from "../models/List.model";
import { ListItemModel } from "../models/ListItem.model";

const insertListItem = async (listItem: Partial<ListItem>) => {
  const list = await ListModel.findById(listItem.listId);
  if (!list) {
    throw new Error("List not found");
  }
  const movieExists = await isMovieInList(listItem.listId?.toString(), listItem.movieId?.toString());
  if (movieExists) {
    throw new Error("Movie already exists in the list");
  }
  const newListItem = await ListItemModel.create(listItem);
  return newListItem;
};

const deleteAllListItems = async () => {
  const deleteResult = await ListItemModel.deleteMany({});
  return deleteResult;
};

const getAllListItems = async () => {
  const listItems = await ListItemModel.find({});
  return listItems;
};
const getAllListItemsOfList = async (listId: string) => {
  const listItems = await ListItemModel.find({ listId });
  return listItems;
};

const getListItemById = async (id: string) => {
  const listItem = await ListItemModel.findById(id);
  return listItem;
};

const updateListItemById = async (id: string, listItemData: ListItem) => {
  const updatedListItem = await ListItemModel.findByIdAndUpdate(
    id,
    listItemData,
    {
      new: true,
    }
  );
  return updatedListItem;
};

const deleteListItemById = async (id: string) => {
  const deleteResult = await ListItemModel.findByIdAndDelete(id);
  return deleteResult;
};
const isMovieInList = async (listId: string | undefined, movieId: string | undefined) => {
  const listItem = await ListItemModel.findOne({ listId, movieId });
  return !!listItem;
};
export {
  insertListItem,
  deleteAllListItems,
  getAllListItems,
  getListItemById,
  updateListItemById,
  deleteListItemById,
  getAllListItemsOfList,
};

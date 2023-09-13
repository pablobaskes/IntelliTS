import axios from "axios";
import jwtDecode from "jwt-decode";
import { List, ListItem, ListItemPayload } from "../types/List.interfaces";
import { User } from "../types/user.interfaces";
import { DecodedToken } from "../types/DecodedToken.interfaces";
import { LIST_ITEM_URL, LIST_URL, LOCAL_BASE_URL, USER_URL } from "../utils/settings";


export const getUserById = async () => {
  try {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return null
    }

    const decodedToken: DecodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const response = await axios.get<User>(`${USER_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getListsByUserId = async (userId: string) => {
  try {
    const response = await axios.get<List[]>(`${LIST_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists by user ID:", error);
    throw error;
  }
};

export const getListItemsOfAList = async (listId: string) => {
  try {
    const response = await axios.get<ListItem[]>(`${LIST_ITEM_URL}/list/${listId}/items`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postListItem = async (payload: ListItemPayload) => {
  try {
    await axios.post(LOCAL_BASE_URL + "/listItem", payload);
  } catch (error) {
    console.error(error);
  }
};
export const createList = async (name: string, userId: string) => {
  try {
    await axios.post(LOCAL_BASE_URL + '/list', {
      userId,
      name
    })
  } catch (error) {
    console.error(error)
  }
}

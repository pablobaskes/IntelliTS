export interface List {
  _id: string;
  createdAt: Date;
  name: string;
  type: string;
  updatedAt: Date;
  userId: string;
}
export interface ListItem {
  _id: string;
  createdAt: Date;
  listId: string;
  movieId: string;
  updatedAt: Date;
}

export interface ListItemPayload {
  listId: string;
  movieId: string;
}

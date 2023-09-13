import { Schema, model } from "mongoose";
import { ListItem } from "../interfaces/lists.interface";

const ListItemSchema = new Schema<ListItem>(
  {
    listId: {
      type: Schema.Types.ObjectId,
      ref: "ListModel",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ListItemModel = model("ListItemModel", ListItemSchema);
export { ListItemModel };

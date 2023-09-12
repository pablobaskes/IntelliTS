import { Schema, model } from "mongoose";
import { List } from "../interfaces/lists.interface";

const ListSchema = new Schema<List>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["system", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ListModel = model("ListModel", ListSchema);
export { ListModel };

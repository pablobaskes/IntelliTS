import { Schema, model } from "mongoose";
import { Car } from "../interfaces/car.interface";

const ItemSchema = new Schema<Car>(
  {
    color: {
      type: String,
    },
    gas: {
      type: String,
      enum: ["gasolina", "diesel"],
    },
    year: {
      type: Number,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 2
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const ItemModel = model("ItemModel", ItemSchema);
export { ItemModel };

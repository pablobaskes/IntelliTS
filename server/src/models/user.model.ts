import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "Description",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const UserModel = model("User", UserSchema);
export { UserModel };

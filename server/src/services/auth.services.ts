import { verify } from "jsonwebtoken";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { encrypt, verifyUser } from "../utils/bcrypt.handler";
import { generateToken } from "../utils/jwt.handler";
import { ListModel } from "../models/List.model";
const regisNewUser = async ({ email, password, name }: User) => {
  const chekifuser = await UserModel.findOne({ email });
  if (chekifuser) return "ALREADY_USER";
  const passHash = await encrypt(password);
  const newUser = await UserModel.create({ email, password: passHash, name });
  const userId = newUser.id;
  const newFavoriteList = await ListModel.create({
    userId,
    name: "Favorite Movies",
    type: "system"
  });
  return { newUser, newFavoriteList };
};
const loginUser = async ({ email, password }: Auth) => {
  const checkUser = await UserModel.findOne({ email });
  if (!checkUser) return "NOT_FOUND_USER";
  const checkPass = await verifyUser(password, checkUser.password);
  if (checkPass) {
    const jwt = generateToken(checkUser.id);
    const userForToken = {
      checkUser,
      jwt,
    };
    return userForToken;
  } else {
    return "WRONG_PASSWORD";
  }
};
export { regisNewUser, loginUser };

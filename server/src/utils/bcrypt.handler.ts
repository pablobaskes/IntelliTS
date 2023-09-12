import { hash, compare } from "bcryptjs";
import { User } from "../interfaces/user.interface";

const encrypt = async (pass: string) => {
  const passHashed = await hash(pass, 8);
  return passHashed;
};
const verifyUser = async (password: string, passHash: string) => {
  const go = await compare(password, passHash);
  return go
};
export { encrypt, verifyUser };

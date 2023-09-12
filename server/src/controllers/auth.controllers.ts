import { loginUser, regisNewUser } from "../services/auth.services";
import { handleHttp } from "../utils/error.handler";
import { Request, Response } from "express";
const registerCtrl = async ({ body }: Request, res: Response) => {
  try {
    const newUser = await regisNewUser(body);
    res.status(201).send(newUser);
  } catch (e) {
    handleHttp(res, "ERROR_REGIS", e);
  }
};
const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const logedUser = await loginUser({ email, password });

    res.json(logedUser);
  } catch (e) {
    handleHttp(res, "ERROR_LOGIN", e);
  }
};
export { registerCtrl, loginCtrl };

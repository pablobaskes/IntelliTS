import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handler";
import { ReqExtended } from "../interfaces/ReqExtended.interface";
const checkjwt = (req: ReqExtended, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || null;
    const jwt = jwtByUser?.split(" ").pop();

    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      res.status(401).send("NO_VALID_SESSION");
    } else {
      req.user = isUser
      next();
    }
  } catch (e) {
    res.status(400);
    res.send("NO_VALID_SESSION");
  }
};
export { checkjwt };

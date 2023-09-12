import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface ReqExtended extends Request {
  user?: JwtPayload | string;
}

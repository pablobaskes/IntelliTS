import { Response } from "express";
import { ErrorWithResponse } from "../interfaces/ErrorWithResponse.interface";
const handleHttp = (res: Response, error: string, e: unknown) => {
  console.log(e);
  let errorMsg: string;

  if (typeof e === "object" && e !== null && "response" in e) {
    const errorWithResponse = e as ErrorWithResponse;
    errorMsg = errorWithResponse.response?.data ?? "Issue on server";
  } else {
    errorMsg = "Unexpected error";
  }
  res.status(500);
  res.send({ error });
};
export { handleHttp };

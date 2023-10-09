import responseSetter from "../helper/setResponse";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  responseSetter(
    res,
    200,
    "Physical robot services is running. Please use the API endpoints to access data.",
    null
  );
}

export default {
  get,
};

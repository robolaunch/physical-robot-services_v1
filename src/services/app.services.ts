import { envFolderPath } from "../providers/envProvider";
import responseSetter from "../helper/responseSetter";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  responseSetter(res, 200, "Robot server is running");
}

export default {
  get,
};

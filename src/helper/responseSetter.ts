import { Response } from "express";

export default function responseSetter(
  response: Response,
  status: number,
  message: string,
  data?: any
) {
  console.log(
    `[${response.req.method} ${status} - ${response.req.url}] ${message}`
  );

  response.status(status).json({
    success: status < 300 ? true : false,
    message: message,
    data: data,
  });
}

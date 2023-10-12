import { Request, Response } from "express";

export const basicController = (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
};

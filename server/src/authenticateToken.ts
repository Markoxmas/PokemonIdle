import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  require("dotenv").config();
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    return res
      .status(500)
      .json({ message: "Internal server error: Secret key not found" });
  }

  jwt.verify(
    token,
    SECRET_KEY,
    (err: VerifyErrors | null, authorizedData: any) => {
      if (err) {
        console.error("ERROR: Could not connect to the protected route");
        return res.sendStatus(403);
      } else {
        //@ts-ignore
        req.user = authorizedData.username;
        next();
      }
    }
  );
}

export default authenticateToken;

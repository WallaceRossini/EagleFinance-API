import { Request, Response } from 'express'
import jwt from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const token = jwt.sign({ userId: req.user_id }, String(process.env.JWT_SECRET));
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error creating token" });
    }
  };
}


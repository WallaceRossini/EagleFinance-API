import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { loginSchema } from "../validations/AuthSchema";

export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error hashing password" });
  }
};

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = await loginSchema.parseAsync(req.body);

    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.user_id = user.id

    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

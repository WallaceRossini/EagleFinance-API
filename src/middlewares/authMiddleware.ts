import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { loginSchema } from "../validations/AuthSchema";
import jwt, {JwtPayload} from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  userId: string
}

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

export const verifyToken = async(
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const blacklistedToken = await prisma.blackListedToken.findUnique({
      where: { token },
    });
  
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    jwt.verify(token, String(process.env.JWT_SECRET), (err, decodedToken: TokenPayload) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      } else {
        req.user_id = decodedToken.userId
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
}


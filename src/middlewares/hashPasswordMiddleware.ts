import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const hashPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    req.body.password = hashedPassword;
    next();
  });
};

export const createToken = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  jwt.sign({ username }, 'secret', { expiresIn: '1h' }, (err, token) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    req.body.token = token;
    next();
  });
};

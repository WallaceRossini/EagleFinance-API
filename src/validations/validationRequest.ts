import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validateRequest = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      req.body = schema.parse(body)
      next()
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}
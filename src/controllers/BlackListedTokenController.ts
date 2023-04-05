import { Request, Response } from "express";
import { BlackListedTokenService } from "../services/BlackListedTokenService"

const blackListedTokenService = new BlackListedTokenService()

export class BlackListedTokenController {
  async createBlackListedToken(req: Request, res: Response) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      await blackListedTokenService.createBlackListedToken({ token })
      res.status(200).json({ message: 'Logout successful.' })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create black listed token' });
    }
  }

  async getBlackListedTokenByToken(req: Request, res: Response) {
    try {
      const blackListedToken = await blackListedTokenService.getBlackListedTokenByToken(req.params.id)
      res.status(200).json(blackListedToken)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get black listed token' });
    }
  }
}
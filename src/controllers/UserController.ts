import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const userService = new UserService()

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get user' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get users' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }

}
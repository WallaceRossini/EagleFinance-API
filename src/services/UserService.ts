import { IUser, IUserCreate, IUserUpdate } from "../interfaces/IUser";
import prisma from "../utils/prisma";

export class UserService {
  async createUser(data: IUserCreate): Promise<IUser> {
    return prisma.user.create({ data });
  }

  async getUserById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Partial<IUserUpdate>): Promise<IUser> {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<IUser> {
    return prisma.user.delete({ where: { id } });
  }

  async getUsers(): Promise<IUser[]> {
    return prisma.user.findMany();
  }
}

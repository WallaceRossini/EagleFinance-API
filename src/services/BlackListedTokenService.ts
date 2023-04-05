import { IBlackListedToken, IBlackListedTokenCreate } from "../interfaces/IBlackListedToken";
import prisma from "../utils/prisma";

export class BlackListedTokenService {
  async createBlackListedToken(data: IBlackListedTokenCreate): Promise<IBlackListedToken> {
    return prisma.blackListedToken.create({ data })
  }

  async getBlackListedTokenByToken(token: string): Promise<IBlackListedToken | null> {
    return prisma.blackListedToken.findUnique({ where: { token } })
  }
}
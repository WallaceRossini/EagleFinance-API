import { ITransaction, ITransactionCreate, ITransactionUpdate } from "../interfaces/ITransaction";
import prisma from "../utils/prisma";


export class TransactionService {
  async createTransaction(data: ITransactionCreate): Promise<ITransactionCreate> {
    return prisma.transaction.create({ data });
  }

  async getTransactionById(id: string): Promise<ITransaction | null> {
    return prisma.transaction.findUnique({ where: { id } });
  }

  async updateTransaction(id: string, data: Partial<ITransactionUpdate>): Promise<ITransaction> {
    return prisma.transaction.update({ where: { id }, data });
  }

  async deleteTransaction(id: string): Promise<ITransaction> {
    return prisma.transaction.delete({ where: { id } });
  }

  async getTransactions(): Promise<ITransaction[]> {
    return prisma.transaction.findMany();
  }
}
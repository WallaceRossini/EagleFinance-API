import { date } from "zod";
import { ITransaction, ITransactionCreate, ITransactionUpdate } from "../interfaces/ITransaction";
import prisma from "../utils/prisma";


export class TransactionService {
  async createTransaction(data: ITransactionCreate): Promise<ITransaction> {
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

  async getTransactions(userId: string): Promise<ITransaction[]> {
    return prisma.transaction.findMany({ where: { userId } });
  }

  async deleteAllTransactions() {
    return prisma.transaction.deleteMany({});
  }

  async getTotalExpensesAndIncome(userId: string) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    const historic = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        }
      }
    });

    const totalIncome = historic.filter((transaction) => transaction.transactionType === "INCOME")
      .reduce((acc, transaction) => acc + transaction.value, 0)
      .toFixed(2);

    const totalExpense = historic.filter((transaction) => transaction.transactionType === "EXPENSE")
      .reduce((acc, transaction) => acc + transaction.value, 0)
      .toFixed(2);

    const balance = (Number(totalIncome) - Number(totalExpense)).toFixed(2);

    return { income: totalIncome, expense: totalExpense, balance, historic }
  }
}
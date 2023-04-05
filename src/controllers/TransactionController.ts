import { Request, Response } from 'express'
import { TransactionService } from '../services/TransactionService'
import { ITransactionCreate } from '../interfaces/ITransaction'

const transactionService = new TransactionService()

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const user = await transactionService.createTransaction(req.body)
      res.status(201).json(user)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create transaction' });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    try {
      const transaction = await transactionService.getTransactionById(req.params.id);
      res.status(200).json(transaction)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get transaction' });
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const transactions = await transactionService.getTransactions();
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get transaction' });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const transaction = await transactionService.updateTransaction(req.params.id, req.body);
      res.json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update transaction' });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    try {
      const transaction = await transactionService.deleteTransaction(req.params.id);
      res.json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete transaction' });
    }
  }

}
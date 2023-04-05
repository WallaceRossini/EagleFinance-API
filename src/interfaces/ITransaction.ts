import { ETransaction } from "../enums/ETransaction";

interface ITransaction {
  id: string
  description: string;
  value: number;
  transactionType: string;
  date: Date;
  paid: boolean;
  dueDate: Date | null;
  userId: string;
}

interface ITransactionCreate {
  description: string;
  value: number;
  dueDate?: Date | null;
  transactionType: string
  date: Date;
  paid: boolean;
  userId: string;
}

interface ITransactionUpdate {
  description?: string;
  value?: number;
  transactionType?: string;
  date?: Date;
  paid?: boolean;
  dueDate?: Date;
  userId?: string;
}

export { ITransaction, ITransactionCreate, ITransactionUpdate }
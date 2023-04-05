import { z } from 'zod'

const transactionCreateSchema = z.object({
  description: z.string().min(1).max(255),
  date: z.string().transform((value) => new Date(value)),
  paid: z.boolean(),
  transactionType: z.enum(['INCOME', 'EXPENSE']),
  userId: z.string(),
  value: z.number().nonnegative(),
  dueDate: z.string().transform((value) => new Date(value))
});
export {
  transactionCreateSchema
}
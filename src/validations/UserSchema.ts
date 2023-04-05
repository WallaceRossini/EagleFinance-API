import { z } from 'zod'

const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email()
})

const updateUserSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  email: z.string().email().optional(),
})

export { createUserSchema, updateUserSchema }
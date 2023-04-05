import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { TransactionController } from './controllers/TransactionController'
import { validateRequest } from './validations/validationRequest'
import { createUserSchema, updateUserSchema } from './validations/UserSchema'
import { transactionCreateSchema } from './validations/TransactionSchema'
import { createToken, hashPassword } from './middlewares/hashPasswordMiddleware'
import { validateLogin } from './middlewares/authMiddleware'
import { AuthController } from './controllers/AuthController'

const userController = new UserController()
const transactionController = new TransactionController()
const authController = new AuthController()
const router = Router()

router.post('/sign',hashPassword,validateLogin,authController.login)

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.post('/users', validateRequest(createUserSchema), hashPassword, userController.createUser)
router.put('/users/:id', validateRequest(updateUserSchema), userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactionById)
router.post('/transactions', validateRequest(transactionCreateSchema), transactionController.createTransaction)
router.put('/transactions/:id', transactionController.updateTransaction)
router.delete('/transactions/:id', transactionController.deleteTransaction)

export default router
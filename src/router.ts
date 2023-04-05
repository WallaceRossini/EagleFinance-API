import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { TransactionController } from './controllers/TransactionController'
import { validateRequest } from './validations/validationRequest'
import { createUserSchema, updateUserSchema } from './validations/UserSchema'
import { transactionCreateSchema } from './validations/TransactionSchema'
import { createToken, hashPassword } from './middlewares/hashPasswordMiddleware'
import { validateLogin, verifyToken } from './middlewares/authMiddleware'
import { AuthController } from './controllers/AuthController'
import { BlackListedTokenController } from './controllers/BlackListedTokenController'

const userController = new UserController()
const transactionController = new TransactionController()
const authController = new AuthController()
const blackListedTokenController = new BlackListedTokenController()
const router = Router()

router.post('/log_in', validateLogin, authController.login)
router.post('/log_out', verifyToken,blackListedTokenController.createBlackListedToken)

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.post('/users', validateRequest(createUserSchema), hashPassword, userController.createUser)
router.put('/users', verifyToken,validateRequest(updateUserSchema), hashPassword, userController.updateUser)
router.delete('/users', verifyToken, userController.deleteUser)

router.get('/transactions', verifyToken, transactionController.getTransactions)
router.get('/transactions/:id',verifyToken,transactionController.getTransactionById)
router.post('/transactions', verifyToken, validateRequest(transactionCreateSchema), transactionController.createTransaction)
router.put('/transactions/:id', verifyToken,transactionController.updateTransaction)
router.delete('/transactions/:id', verifyToken,transactionController.deleteTransaction)

export default router
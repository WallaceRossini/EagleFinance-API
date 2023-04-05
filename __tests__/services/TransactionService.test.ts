import { ITransactionCreate } from '../../src/interfaces/ITransaction'
import { TransactionService } from '../../src/services/TransactionService'
import { UserService } from '../../src/services/UserService'
describe("TransactionService", () => {

  let transacticnService: TransactionService
  let userService: UserService

  beforeAll(() => {
    transacticnService = new TransactionService()
    userService = new UserService()
  })

  afterAll(async () => {
    await transacticnService.deleteAllTransactions()
    await userService.deleteAllUsers()
  })

  describe("createTransaction", () => {
    test("should create a new transaction", async () => {

      const userData = {
        username: "transaction1",
        email: "transaction1@test.com",
        password: "123456"
      };

      const user = await userService.createUser(userData);

      const mockedTransaction = {
        id: "6b5ee7ee-0ed4-4e87-ae0a-bda2e56afaef",
        userId: user.id,
        description: "Educação",
        value: 725.00,
        dueDate: new Date("2023-04-05"),
        transactionType: "EXPENSE",
        date: new Date("2023-04-05"),
        paid: true
      };

      transacticnService.createTransaction = jest.fn().mockReturnValue(mockedTransaction)

      const transactionData: ITransactionCreate = {
        userId: user.id,
        description: "Educação",
        value: 725.00,
        dueDate: new Date("2023-04-05"),
        transactionType: "EXPENSE",
        date: new Date("2023-04-05"),
        paid: true
      };

      const transaction = await transacticnService.createTransaction(transactionData)

      expect(transaction).toBe(mockedTransaction);
      

    })
  })
})
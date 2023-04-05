import { IUserCreate, IUserUpdate } from "../../src/interfaces/IUser";
import { UserService } from "../../src/services/UserService";
import bcrypt from 'bcrypt'
describe("UserService", () => {
  let userService: UserService;

  beforeAll(async () => {
    userService = new UserService();
  });

  afterAll(async () => {
    await userService.deleteAllUsers();
  });

  describe('createUser', () => {
    test("should create a new user", async () => {
      const userData = {
        username: "user1",
        email: "user1@test.com",
        password: "123456"
      };

      const user = await userService.createUser(userData);
      const passwordHash = await bcrypt.hash(userData.password, 10);

      expect(user.username).toBe(userData.username);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(passwordHash);
      expect(user.id).toBeTruthy();
    });
  })

  describe('getUserById', () => {
    test("should return a user by id", async () => {
      const userData: IUserCreate = {
        username: "user2",
        email: "user2@test.com",
        password: "abcdef"
      };

      const user = await userService.createUser(userData);
      const foundUser = await userService.getUserById(user.id);

      expect(foundUser).toEqual(user);
    });

    test("should return null if user not found", async () => {
      const foundUser = await userService.getUserById("non-existing-id");

      expect(foundUser).toBeNull();
    });
  })



  describe('updateUser', () => {
    test("should update user data", async () => {
      const userData: IUserCreate = {
        username: "user3",
        email: "user3@test.com",
        password: "test123"
      };

      const user = await userService.createUser(userData);
      const updatedUserData: IUserUpdate = {
        username: "Jane Doe",
        email: "janedoe@example.com",
      };

      const updatedUser = await userService.updateUser(user.id, updatedUserData);

      expect(updatedUser.username).toBe(updatedUserData.username);
      expect(updatedUser.email).toBe(updatedUserData.email);
      expect(updatedUser.password).toBe(userData.password);
      expect(updatedUser.id).toBe(user.id);
    });
  })

  describe('deleteUser', () => {
    test("should delete a user by id", async () => {
      const userData: IUserCreate = {
        username: "user4",
        email: "user4@test.com",
        password: "qwerty123"
      };

      const user = await userService.createUser(userData);
      const deletedUser = await userService.deleteUser(user.id);

      expect(deletedUser).toEqual(user);

      const foundUser = await userService.getUserById(user.id);
      expect(foundUser).toBeNull();
    });
  })

  describe('getUsers', () => {
    test("should return a list of users", async () => {

      await userService.deleteAllUsers();
      
      const userData1: IUserCreate = {
        username: "user5",
        email: "user5@test.com",
        password: "p@ssw0rd",
      };

      const userData2: IUserCreate = {
        username: "user6",
        email: "user6@test.com",
        password: "p@ssw0rd",
      };

      await userService.createUser(userData1);
      await userService.createUser(userData2);

      const users = await userService.getUsers();

      expect(users.length).toBe(2);
      expect(users[0].username).toBe(userData1.username);
      expect(users[1].username).toBe(userData2.username);
    });
  })
});


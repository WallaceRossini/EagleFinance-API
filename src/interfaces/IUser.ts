interface IUser {
  id: string
  username: string
  password: string
  email: string
}

interface IUserCreate {
  username: string
  password: string
  email: string
}

interface IUserUpdate {
  username?: string
  password?: string
  email?: string
}

export { IUser, IUserCreate, IUserUpdate }
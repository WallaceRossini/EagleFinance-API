interface IBlackListedToken {
  id: string
  token: string;
  blacklistedAt: Date
}

interface IBlackListedTokenCreate {
  token: string;
}

interface IBlackListedTokenUpdate {
  token?: string;
}

export { IBlackListedToken, IBlackListedTokenCreate, IBlackListedTokenUpdate }
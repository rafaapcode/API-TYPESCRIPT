export interface AddAccountModel {
  name: string
  age: number
  email: string
  password: string
}

export interface AccountModel {
  id: string
  name: string
  age: number
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

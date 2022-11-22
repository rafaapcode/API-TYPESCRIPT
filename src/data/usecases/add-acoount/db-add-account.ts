import { AccountModel, AddAccount, AddAccountModel, Encrypt, AddAccountRepository } from './add-account-protocols'

export default class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypt
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypt, addAccountRepository: AddAccountRepository) {
    this.encrypt = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashPass = await this.encrypt.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashPass }))
    return Promise.resolve(account)
  }
}

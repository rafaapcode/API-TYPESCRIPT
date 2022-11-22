import { AccountModel, AddAccount, AddAccountModel } from '../../../domain/usecases/addAccount'
import { Encrypt } from '../../protocols/encrypter'

export default class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypt

  constructor (encrypter: Encrypt) {
    this.encrypt = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashPass = await this.encrypt.encrypt(account.password)
    return Promise.resolve(Object.assign({}, account, { id: 'any_id', password: hashPass }))
  }
}

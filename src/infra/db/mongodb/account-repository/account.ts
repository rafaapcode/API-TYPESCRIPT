import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel, AddAccountModel } from '../../../../domain/usecases/addAccount'
import { MongoHelper } from '../helper/mongo'

export default class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollecion = MongoHelper.getCollection('accounts')
    const result = await accountCollecion.insertOne(accountData)
    return MongoHelper.map(result.insertedId.id.toString(), accountData)
  }
}

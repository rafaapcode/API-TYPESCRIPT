import { AccountModel, AddAccountModel } from '../../domain/usecases/addAccount'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}

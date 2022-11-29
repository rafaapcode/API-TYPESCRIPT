import { SignUpController } from '../../presentation/controllers/signup/SignUpController'
import EmailValidatorAdapter from '../../utils/emailValidator/EmailValidatorAdapter'
import DbAddAccount from '../../data/usecases/add-acoount/db-add-account'
import BcryptAdapter from '../../infra/criptography/bcrypt-adapter'
import AccountMongoRepository from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const salt = 12

  const addAccountRepository = new AccountMongoRepository()
  const encrypt = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(encrypt, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, dbAddAccount)
}

import { LogRepositoryError } from './../../data/usecases/logErrorRepository/logErrorRepository'
import { SignUpController } from '../../presentation/controllers/signup/SignUpController'
import EmailValidatorAdapter from '../../utils/emailValidator/EmailValidatorAdapter'
import DbAddAccount from '../../data/usecases/add-acoount/db-add-account'
import BcryptAdapter from '../../infra/criptography/bcrypt-adapter'
import AccountMongoRepository from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const salt = 12

  const addAccountRepository = new AccountMongoRepository()
  const encrypt = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(encrypt, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidator, dbAddAccount)
  const logErrorRepository = new LogRepositoryError()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}

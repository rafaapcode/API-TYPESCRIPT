import DbAddAccount from './db-add-account'
import { Encrypt, AddAccountModel, AccountModel, AddAccountRepository } from './add-account-protocols'

const makeEncrypter = (): Encrypt => {
  class EncrypterStub implements Encrypt {
    async encrypt (password: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }

  return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  age: 10,
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'any_name',
  age: 10,
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface SutTypes {
  dbAddAccount: DbAddAccount
  encrypterStub: Encrypt
  addAccountRepositoryStub: AddAccountRepository
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const dbAddAccount = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    dbAddAccount,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should calls Encrypter with correct password', async () => {
    const { dbAddAccount, encrypterStub } = makeSut()
    const spyEncrypt = jest.spyOn(encrypterStub, 'encrypt')

    await dbAddAccount.add(makeFakeAccountData())

    expect(spyEncrypt).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { dbAddAccount, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = dbAddAccount.add(makeFakeAccountData())

    await expect(promise).rejects.toThrow()
  })

  test('Should calls AddAccountRepository with correct values', async () => {
    const { dbAddAccount, addAccountRepositoryStub } = makeSut()
    const spyRepo = jest.spyOn(addAccountRepositoryStub, 'add')

    await dbAddAccount.add(makeFakeAccountData())
    expect(spyRepo).toHaveBeenCalledWith({
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { dbAddAccount, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = dbAddAccount.add(makeFakeAccountData())

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account if success', async () => {
    const { dbAddAccount } = makeSut()

    const account = await dbAddAccount.add(makeFakeAccountData())

    expect(account).toEqual(makeFakeAccount())
  })
})

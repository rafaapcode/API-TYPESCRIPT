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
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        age: 10,
        email: 'any_email@mail.com',
        password: 'hashed_password'
      })
    }
  }

  return new AddAccountRepositoryStub()
}

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
    const data = {
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await dbAddAccount.add(data)

    expect(spyEncrypt).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { dbAddAccount, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const data = {
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const promise = dbAddAccount.add(data)

    await expect(promise).rejects.toThrow()
  })

  test('Should calls AddAccountRepository with correct values', async () => {
    const { dbAddAccount, addAccountRepositoryStub } = makeSut()
    const spyRepo = jest.spyOn(addAccountRepositoryStub, 'add')
    const data = {
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    await dbAddAccount.add(data)
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
    const data = {
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const promise = dbAddAccount.add(data)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account if success', async () => {
    const { dbAddAccount } = makeSut()
    const data = {
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const account = await dbAddAccount.add(data)

    expect(account).toEqual({
      id: 'any_id',
      name: 'any_name',
      age: 10,
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })
})

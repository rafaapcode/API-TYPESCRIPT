import DbAddAccount from './db-add-account'
import { Encrypt } from '../../protocols/encrypter'

const makeEncrypter = (): Encrypt => {
  class EncrypterStub {
    async encrypt (password: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  dbAddAccount: DbAddAccount
  encrypterStub: Encrypt
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const dbAddAccount = new DbAddAccount(encrypterStub)

  return {
    dbAddAccount,
    encrypterStub
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
})

import { MongoHelper } from '../helper/mongo'
import AccountMongoRepository from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      age: 10,
      password: 'any_password'
    })
    expect(account.id).toBeTruthy()
    expect(account).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.age).toBe(10)
    expect(account.password).toBe('any_password')
  })
})

import BcryptAdapter from './bcrypt-adapter'
import bcryptjs from 'bcryptjs'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should BcryptAdapter call bcrypt with correct values', async () => {
    const sut = makeSut()
    const spyBcrypt = jest.spyOn(bcryptjs, 'hash')

    await sut.encrypt('any_value')
    expect(spyBcrypt).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })
})

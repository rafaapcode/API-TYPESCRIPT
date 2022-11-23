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

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcryptjs, 'hash') as unknown as jest.Mock<ReturnType<(key: Error) => Promise<Error>>, Parameters<(key: Error) => Promise<Error>>>
    hashSpy.mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})

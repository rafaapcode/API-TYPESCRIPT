import BcryptAdapter from './bcrypt-adapter'
import bcryptjs from 'bcryptjs'

describe('Bcrypt Adapter', () => {
  test('Should BcryptAdapter call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const spyBcrypt = jest.spyOn(bcryptjs, 'hash')

    await sut.encrypt('any_value')
    expect(spyBcrypt).toHaveBeenCalledWith('any_value', salt)
  })
})

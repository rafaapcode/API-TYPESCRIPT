import { Encrypt } from '../../data/protocols/encrypter'
import bcryptjs from 'bcryptjs'

export default class BcryptAdapter implements Encrypt {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    await bcryptjs.hash(password, this.salt)
    return ''
  }
}

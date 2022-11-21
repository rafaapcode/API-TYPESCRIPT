import EmailValidatorAdapter from './EmailValidatorAdapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => {
  const emailvalidator = new EmailValidatorAdapter()

  return emailvalidator
}

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator', () => {
  test('Should return false if EmailValidator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = makeSut()
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})

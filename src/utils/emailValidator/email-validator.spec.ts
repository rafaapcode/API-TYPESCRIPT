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

  test('Should return true if EmailValidator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(true)
  })

  test('Should calls EmailValidator with correct values', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@gmail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})

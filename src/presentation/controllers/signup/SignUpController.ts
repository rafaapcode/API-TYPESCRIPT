import { HttpRequest, HttpResponse, Controller, EmailValidator, MissingParamError, InvalidParamError } from './signup-protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { AddAccount } from '../../../domain/usecases/addAccount'

export class SignUpController implements Controller {
  private readonly emailvalidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addaccount: AddAccount) {
    this.emailvalidator = emailValidator
    this.addAccount = addaccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const keys = ['name', 'email', 'age', 'password', 'confirmationPassword']

      for (const key of keys) {
        if (!httpRequest.body[key]) {
          return badRequest(new MissingParamError(`${key}`))
        }
      }

      const { name, email, age, password, confirmationPassword } = httpRequest.body

      if (password !== confirmationPassword) {
        return badRequest(new InvalidParamError('confirmationPassword'))
      }

      const isValidEmail = this.emailvalidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.addAccount.add({
        name,
        age,
        email,
        password
      })

      return { statusCode: 200, body: httpRequest.body }
    } catch (error) {
      return serverError()
    }
  }
}

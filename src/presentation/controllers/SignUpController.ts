import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailvalidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailvalidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const keys = ['name', 'email', 'age', 'password', 'confirmationPassword']

      for (const key of keys) {
        if (!httpRequest.body[key]) {
          return badRequest(new MissingParamError(`${key}`))
        }
      }

      const { email, password, confirmationPassword } = httpRequest.body

      if (password !== confirmationPassword) {
        return badRequest(new InvalidParamError('confirmationPassword'))
      }

      const isValidEmail = this.emailvalidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      return { statusCode: 200, body: httpRequest.body }
    } catch (error) {
      return serverError()
    }
  }
}

import { HttpRequest, HttpResponse } from '../protocols/http'
import MissingParamError from '../errors/Missing-param-error'
import ServerError from '../errors/Server-error'
import InvalidParamError from '../errors/Invalid-param-error'
import { Controller } from '../protocols/controller'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/emailValidator'

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

      const isValidEmail = this.emailvalidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      return { statusCode: 200, body: httpRequest.body }
    } catch (error) {
      return { statusCode: 500, body: new ServerError() }
    }
  }
}

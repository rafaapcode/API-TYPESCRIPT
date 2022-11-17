import { HttpRequest, HttpResponse } from '../protocols/http'
import MissingParamError from '../errors/Missing-param-error'
import { Controller } from '../protocols/controller'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const keys = ['name', 'email', 'age', 'password', 'confirmationPassword']

    for (const key of keys) {
      if (!httpRequest.body[key]) {
        return badRequest(new MissingParamError(`${key}`))
      }
    }

    return { statusCode: 200, body: httpRequest.body }
  }
}

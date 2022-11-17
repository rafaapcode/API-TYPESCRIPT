import { HttpRequest, HttpResponse } from '../protocols/http'
import MissingParamError from '../errors/Missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const keys = ['name', 'email', 'age', 'password', 'confirmationPassword']

    for (const key of keys) {
      if (!httpRequest.body[key]) {
        return {
          statusCode: 400,
          body: new MissingParamError(`${key}`)
        }
      }
    }

    return { statusCode: 200, body: httpRequest.body }
  }
}

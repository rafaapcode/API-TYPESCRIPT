import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const keys = ['name', 'email', 'age', 'password', 'confirmationPassword']

    for (const key of keys) {
      if (!httpRequest.body[key]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${key}`)
        }
      }
    }

    return { statusCode: 200, body: httpRequest.body }
  }
}

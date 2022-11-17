export class SignUpController {
  handle (httpRequest: any): any {
    const keys = ['name', 'email', 'age', 'password', 'confirmationPassword']

    for (const key of keys) {
      if (!httpRequest.body[key]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${key}`)
        }
      }
    }
  }
}

import { HttpRequest, HttpResponse } from './../../presentation/protocols/http'
import { Controller } from './../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: 'Deu certo'
      }

      return Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call handle method with correct values', async () => {
    const { controllerStub, sut } = makeSut()
    const spyControllerStub = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail',
        age: 10,
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(spyControllerStub).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail',
        age: 10,
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual({
      statusCode: 200,
      body: 'Deu certo'
    })
  })
})

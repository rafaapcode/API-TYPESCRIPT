import { AccountModel } from './../../domain/usecases/addAccount'
import { HttpRequest, HttpResponse } from './../../presentation/protocols/http'
import { Controller } from './../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'
import { serverError, ok } from './../../presentation/helpers/http-helper'
import { LogErrorRepository } from '../../data/protocols/logErrorRepository'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(makeFakeAcoount()))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    age: 10,
    password: 'any_password',
    confirmationPassword: 'any_password'
  }
})

const makeFakeError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  const error = serverError(fakeError)

  return error
}

const makeFakeAcoount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  age: 10,
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call handle method with correct values', async () => {
    const { controllerStub, sut } = makeSut()
    const spyControllerStub = jest.spyOn(controllerStub, 'handle')

    await sut.handle(makeHttpRequest())
    expect(spyControllerStub).toHaveBeenCalledWith(makeHttpRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httResponse = await sut.handle(makeHttpRequest())
    expect(httResponse).toEqual(ok(makeFakeAcoount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(makeFakeError()))

    await sut.handle(makeHttpRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})

export class MissingParamError extends Error {
  constructor (paramname: string) {
    super(`Missing parameter: ${paramname}`)
    this.name = 'MissingParam'
  }
}

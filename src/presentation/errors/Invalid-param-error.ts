export class InvalidParamError extends Error {
  constructor (paramname: string) {
    super(`Invalid parameter: ${paramname}`)
    this.name = 'InvalidParam'
  }
}

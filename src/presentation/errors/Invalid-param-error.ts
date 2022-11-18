export default class InvalidParam extends Error {
  constructor (paramname: string) {
    super(`Invalid parameter: ${paramname}`)
    this.name = 'InvalidParam'
  }
}

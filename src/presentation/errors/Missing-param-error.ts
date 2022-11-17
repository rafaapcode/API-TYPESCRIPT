export default class MissingParam extends Error {
  constructor (paramname: string) {
    super(`Missing parameter: ${paramname}`)
    this.name = 'MissingParam'
  }
}

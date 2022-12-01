export class ServerError extends Error {
  constructor (stack?: string | undefined) {
    super('Server internal error')
    this.name = 'ServerError'
    this.stack = stack
  }
}

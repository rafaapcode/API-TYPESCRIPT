import { LogErrorRepository } from '../../data/protocols/logErrorRepository'

export class LogRepositoryError implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    return Promise.resolve()
  }
}

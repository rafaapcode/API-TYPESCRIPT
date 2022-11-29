import { Controller } from '../../presentation/protocols/controller'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): any => {
  return async (req: Request, res: Response): Promise<any> => {
    const httpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

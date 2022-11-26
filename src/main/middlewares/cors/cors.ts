import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-method', '*')
  res.setHeader('access-control-allow-headers', '*')

  next()
}

import { Express } from 'express'
import { expressForm, expressJson } from '../middlewares/index'
import cors from '../middlewares/cors/cors'

export default (app: Express): void => {
  app.use(expressJson)
  app.use(expressForm)
  app.use(cors)
}

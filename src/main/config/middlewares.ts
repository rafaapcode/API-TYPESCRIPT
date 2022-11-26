import { Express } from 'express'
import { expressJson, expressForm } from '../middlewares/express-json/express-json'
import cors from '../middlewares/cors/cors'

export default (app: Express): void => {
  app.use(expressJson)
  app.use(expressForm)
  app.use(cors)
}

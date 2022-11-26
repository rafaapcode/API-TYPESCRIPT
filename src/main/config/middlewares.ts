import { Express } from 'express'
import { expressJson, expressForm } from '../middlewares/express-json/express-json'

export default (app: Express): void => {
  app.use(expressJson)
  app.use(expressForm)
}

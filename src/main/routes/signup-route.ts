import { Router } from 'express'
import { makeSignUpController } from '../factories/signupFactory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default async (router: Router): Promise<any> => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}

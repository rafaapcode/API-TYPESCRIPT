import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo'

describe('SignUp Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return the same body of request', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rafael Lindo',
        email: 'rafael@gmail.com',
        age: 19,
        password: 'qweasdzc',
        confirmationPassword: 'qweasdzc'
      })
      .expect(200)
  })
})

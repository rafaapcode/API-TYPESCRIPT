import request from 'supertest'
import app from '../config/app'

describe('SignUp Route', () => {
  test('Should return the same body of request', async () => {
    await request(app)
      .post('/api')
      .send({ name: 'Rafael Lindo' })
      .expect(200)
  })
})

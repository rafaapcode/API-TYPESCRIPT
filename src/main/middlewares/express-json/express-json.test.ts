import request from 'supertest'
import app from '../../config/app'

describe('Express Json', () => {
  test('Should return a json', async () => {
    app.post('/test', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test')
      .send({ name: 'Rafael Lindo' })
      .expect({ name: 'Rafael Lindo' })
  })
})

import { MongoHelper } from '../infra/db/mongodb/helper/mongo'
import env from 'dotenv'

env.config()

MongoHelper.connect(process.env.MONGO)
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(3333, () => console.log('Listening on port 3333'))
  })
  .catch(err => {
    console.log(err.message)
  })

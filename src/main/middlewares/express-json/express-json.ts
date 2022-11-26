import { json, urlencoded } from 'express'

const expressJson = json()
const expressForm = urlencoded({ extended: true })

export { expressJson, expressForm }

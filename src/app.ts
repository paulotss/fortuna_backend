import express from 'express'
import clientRouter from './routes/client.route'
import ErrorHandle from './middlewares/ErrorHandle'

const app = express()

app.use(express.json())

app.use(clientRouter)

app.use(ErrorHandle.handle)

export default app

import 'dotenv/config'
import app from './app'
import http from 'http'

const server = http.createServer(app)

const { PORT } = process.env

server.listen(PORT, () => { console.log(`Listening port ${PORT}`) })

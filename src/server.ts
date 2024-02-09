import 'dotenv/config'
import app from './app'
import http from 'http'
import socketIO from 'socket.io'

const server = http.createServer(app)
export const io = new socketIO.Server(server, { cors: { origin: 'http://localhost:3000' } })

// io.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//   });
// })

const { PORT } = process.env

server.listen(PORT, () => { console.log('Listening port 3001') })

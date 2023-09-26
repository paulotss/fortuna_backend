import 'dotenv/config'
import app from './app'

const { PORT } = process.env

app.listen(PORT, () => { console.log('Listening port 3001') })

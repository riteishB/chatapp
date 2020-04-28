import express from 'express'
import io from 'socket.io'
import * as http from 'http'
import cors from 'cors'

const app = express()
const server = new http.Server(app)
const socketio = io(server)
const PORT = process.env.PORT || 3200

// CORS enabled
app.use(cors())

// default healthcheck route
app.get('/healthcheck', ({ res }) => {
    res?.json({
        status: '200',
        msg: 'Server is running',
    })
})

socketio.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('user', (data) => {
        console.log(data)
    })
})

// make the http server listen in port 3000
server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})

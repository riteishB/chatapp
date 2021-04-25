import express from 'express'
import io from 'socket.io'
import * as http from 'http'
import cors from 'cors'
import { addUsers, removeUser, getConnectedUsersForRoom } from './users'
import { availableRooms } from './userStore/rooms'

const app = express()
const server = new http.Server(app)
const socketio = io(server)
const PORT = process.env.PORT || 3200

// CORS enabled
app.use(cors())

// serve static file
app.use('/', express.static('public'))

// default healthcheck route
app.get('/healthcheck', ({ res }) => {
    res?.json({
        status: '200',
        msg: 'Server is running',
    })
})

// make the http server listen in port 3000
server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})

socketio.on('connection', (socket) => {
    socket.emit('rooms', availableRooms)
    socket.on('joinRoom', (userData) => {
        if (userData.user) {
            const id = socket.id
            try {
                addUsers({
                    name: userData.user,
                    room: userData.room,
                    id: id,
                })

                socket.emit('userConnected', userData)

                socket.join(userData.room)

                socketio
                    .to(userData.room)
                    .emit('usersList', getConnectedUsersForRoom(userData.room))

                socket.on('userMsg', (data) => {
                    socketio.to(data.room).emit('message', {
                        user: data.user,
                        message: data.message,
                        time: new Date(),
                    })
                })

                socket.on(
                    'userJoinedRoom',
                    (data: { user: string; room: string }) => {
                        socketio.to(data.room).emit('message', {
                            user: 'ADMIN',
                            message: `${data.user} joined the room!`,
                            time: new Date(),
                        })
                    }
                )

                socket.on('disconnect', () => {
                    removeUser(socket.id)
                    socketio
                        .to(userData.room)
                        .emit(
                            'usersList',
                            getConnectedUsersForRoom(userData.room)
                        )
                    socketio.to(userData.room).emit('message', {
                        user: 'ADMIN',
                        message: `${userData.user} left the room!`,
                        time: new Date(),
                    })
                })
            } catch (err) {
                socket.emit('connectionError', {
                    error: 'Username already taken',
                })
            }
        }
    })
})

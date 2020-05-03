import React, { useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Switch } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'

let SERVER_ENDPOINT
const env = process.env.NODE_ENV

if (env === 'production') {
    SERVER_ENDPOINT = '/'
} else {
    SERVER_ENDPOINT = 'http://localhost:3200'
}

export const socket = socketIOClient(SERVER_ENDPOINT)

export default function App() {
    const [user, setUser] = useState()
    const [room, setRoom] = useState()

    useEffect(
        () => {
            socket.emit('joinRoom', {
                user: user,
                room: room,
            })
        },
        [user, room]
    )

    return (
        <Switch>
            <Route
                path="/"
                component={() => <Login setUser={setUser} setRoom={setRoom} />}
                exact
            />
            <Route
                to="/chat"
                component={() => <Chat user={user} room={room} />}
            />
        </Switch>
    )
}

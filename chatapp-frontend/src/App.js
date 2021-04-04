import React, {useState, useEffect } from 'react'
import './App.css'
import {  Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
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
    const [error, setError] = useState()

    const history = useHistory()

    useEffect(
        () => {
            socket.on("userConnected", (data) => {
                setUser(data.user)
                setRoom(data.room)
                history.push(`/chat`)
            })

            socket.on("connectionError", (err) => {
                setError(err.error)   
            })
        },
        []
    )
    

    return (
        <Switch>
            <Route
                path="/"
                component={() => <Login error={error}/>}
                exact
            />
            <Route
                to="/chat"
                component={() => <Chat user={user} room={room} />}
            />
        </Switch>
    )
}

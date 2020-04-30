import React, { useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Switch } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'

const SERVER_ENDPOINT = 'http://localhost:3200'

export default function App() {
    const [user, setUser] = useState()
    const [room, setRoom] = useState()
    const [messages, setMessages] = useState([])
    const [redirect, setRedirect] = useState(false)

    const joinHandler = () => {
        setRedirect(true)
    }

    useEffect(() => {
        const socket = socketIOClient(SERVER_ENDPOINT)
        socket.on('rooms', rooms => {
            console.log(rooms)
        })

        socket.on('message', message => {
            console.log(message)
        })

        socket.emit('join', {
            user: 'test',
            room: 'test',
        })
        // get list of all the rooms that are present
        // get the user to set username and room to join
        // set the data
    }, [])

    return (
        <Switch>
            <Route
                path="/"
                component={() => (
                    <Login
                        setUser={setUser}
                        setRoom={setRoom}
                        joinHandler={joinHandler}
                    />
                )}
                exact
            />
            <Route to="/chat" component={Chat} />
        </Switch>
    )
}

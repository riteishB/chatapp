import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'

export default function App() {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')

    useEffect(() => {
        // get list of all the rooms that are present
        // get the user to set username and room to join
        // set the data
    }, [])
    return (
        <Router>
            <Switch>
                <Route path="/chat" component={Chat} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    )
}

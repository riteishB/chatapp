import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Button, TextField } from '@material-ui/core'
import './Login.css'

export default function Login(props) {
    const [user, setUser] = useState()
    const [room, setRoom] = useState()

    const history = useHistory()

    const handleChange = event => {
        if (event.target.id === 'userName') {
            setUser(event.target.value)
        } else {
            setRoom(event.target.value)
        }
    }

    const joinHandler = () => {
        if (room && user) {
            props.setRoom(room)
            props.setUser(user)
            history.push('/chat')
        }
    }

    return (
        <div className="loginContainer">
            <Paper elevation={3} rounded="true" className="loginForm">
                <div className="loginFormData">
                    <TextField
                        id="userName"
                        label="Username"
                        rowsMax={4}
                        onChange={handleChange}
                    />

                    <TextField
                        id="room"
                        label="Room"
                        rowsMax={4}
                        onChange={handleChange}
                    />
                </div>

                <div className="loginFormButton">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={joinHandler}
                    >
                        Join room
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

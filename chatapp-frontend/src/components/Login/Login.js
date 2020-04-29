import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Button, TextField } from '@material-ui/core'
import './Login.css'

export default function Login() {
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')

    const handleChange = event => {
        if (event.target.id === 'userName') {
            setUser(event.target.value)
        } else {
            setRoom(event.target.value)
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
                    <Link
                        to={{
                            state: { user: user, room: room },
                            pathname: '/chat',
                        }}
                    >
                        <Button variant="contained" color="primary">
                            Join room
                        </Button>
                    </Link>
                </div>
            </Paper>
        </div>
    )
}

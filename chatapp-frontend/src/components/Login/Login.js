import React, { useState } from 'react'
import {Paper, Button, TextField } from '@material-ui/core'
import { socket } from '../../App'

import './Login.css'

export default function Login(props) {
    const [user, setUser] = useState()
    const [room, setRoom] = useState()
  
    const handleChange = event => {
        if (event.target.id === 'userName') {
            setUser(event.target.value)
        } else {
            setRoom(event.target.value)
        }
    }

    const joinHandler = () => {
        if (room && user) {                
            socket.emit('joinRoom', {
                user: user,
                room: room,
            })
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
            {props.error &&
                <div className="alert">
                      <div className="alert-header">
                        Error
                    </div>
                    <div className="alert-message">
                        {props.error}
                    </div>
                </div>
            }
        </div>
    )
}

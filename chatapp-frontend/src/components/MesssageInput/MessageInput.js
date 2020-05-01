import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import './MessageInput.css'
import { socket } from '../../App'

export default function MessageInput(props) {
    const [msg, setMsg] = useState('')

    const msgHandler = event => {
        setMsg(event.target.value)
    }

    const sendHandler = () => {
        if (msg) {
            socket.emit('userMsg', {
                user: props.user,
                room: props.room,
                message: msg,
            })
            setMsg('')
        }
    }

    return (
        <form className="msgForm">
            <TextField
                id="user-message"
                label="Type a msg.."
                variant="outlined"
                onChange={msgHandler}
                value={msg}
            />
            <Button variant="outlined" color="primary" onClick={sendHandler}>
                <SendIcon />
            </Button>
        </form>
    )
}

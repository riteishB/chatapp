import React, { useState } from 'react'
import Message from '../Message/Message'
import { Container } from '@material-ui/core'
import './Messages.css'
import { socket } from '../../App'

export default function Messages() {
    const [messages, setMessages] = useState([])

    socket.on('message', message => {
        setMessages([...messages, message])
    })

    return (
        <Container className="messagesContainer">
            {messages.map((message, index) => {
                return <Message message={message} key={index} />
            })}
        </Container>
    )
}

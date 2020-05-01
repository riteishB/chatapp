import React, { useState, useEffect } from 'react'
import Message from '../Message/Message'
import { Container } from '@material-ui/core'
import './Messages.css'
import { socket } from '../../App'

export default function Messages() {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState({})

    useEffect(
        () => {
            setMessages([...messages, message])
        },
        [message]
    )

    socket.on('message', message => {
        setMessage(message)
    })

    return (
        <Container className="messagesContainer">
            {messages.map((message, index) => {
                if (message.user) {
                    return (
                        <div key={index}>
                            <Message message={message} />
                        </div>
                    )
                }
            })}
        </Container>
    )
}

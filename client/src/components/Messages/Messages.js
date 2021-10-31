import React, { useState, useEffect } from 'react'
import Message from '../Message/Message'
import { Container } from '@material-ui/core'
import ScrollableFeed from 'react-scrollable-feed'
import './Messages.css'
import { socket } from '../../App'


export default function Messages({ loggedInUser }) {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState({})

    useEffect(
        () => {
            setMessages([...messages, message])
        },
        [message]
    )

    useEffect(() => {
        socket.on('message', message => {
            setMessage(message)
        })

    }, [])

    return (
        <Container className="messagesContainer">
            <ScrollableFeed>
                {messages.map((message, index) => {
                    if (message.user) {
                        return (
                            <div key={index} className={loggedInUser === message.user ? 'self' : message.user === 'ADMIN' ? 'full' : 'others'}>
                                <Message message={message} loggedInUser={loggedInUser} />
                            </div>
                        )
                    }
                })}
            </ScrollableFeed>
        </Container>
    )
}

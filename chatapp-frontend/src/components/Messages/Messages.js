import React from 'react'
import Message from '../Message/Message'
import { Container, Button, TextField } from '@material-ui/core'
import './Messages.css'

export default function Messages(props) {
    return (
        <Container className="messagesContainer">
            {props.messages.map((message, index) => {
                return <Message message={message} key={index} />
            })}
        </Container>
    )
}

import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Messages from '../Messages/Messages'
import MessageInput from '../MesssageInput/MessageInput'
import OnlineUsers from '../OnlineUsers/OnlineUsers'
import './Chat.css'

export default function Chat(props) {
    const user = props.user
    const room = props.room
    const messages = props.messages
    if (user == null && room == null) {
        return <Redirect to="/" />
    } else {
        return (
            <div className="chatContainer">
                <div className="chat-header">
                    {user} {room}
                </div>
                <Messages messages={messages} />
                <MessageInput />
                <OnlineUsers />
            </div>
        )
    }
}

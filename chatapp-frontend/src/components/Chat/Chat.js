import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Messages from '../Messages/Messages'
import MessageInput from '../MesssageInput/MessageInput'
import OnlineUsers from '../OnlineUsers/OnlineUsers'
import './Chat.css'

export default function Chat(props) {
    const user = props.location.state ? props.location.state.user : undefined
    const room = props.location.state ? props.location.state.room : undefined
    if (user == null && room == null) {
        return <Redirect to="/" />
    } else {
        return (
            <div className="chatContainer">
                <div className="chat-header">
                    {user} {room}
                </div>
                <Messages />
                <MessageInput />
                <OnlineUsers />
            </div>
        )
    }
}

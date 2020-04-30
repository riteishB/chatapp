import React from 'react'
import { Divider } from '@material-ui/core'
import './Message.css'

export default function Message(props) {
    return (
        <div className="message">
            <div className="messageUser">{props.message.user}</div>
            <Divider />
            <div className="msgInfo">{props.message.message}</div>
        </div>
    )
}

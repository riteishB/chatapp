import React from 'react'
import {
    Avatar,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import './Message.css'

export default function Message(props) {
    return (
        <div className="message-well">
            {props.message.user !== 'ADMIN' &&
                <div className="message-header">
                    <div className="message-header-icon">
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </div>

                    <div className="message-header-text">
                        <span className="message-user">{props.message.user} </span>
                        <span className="message-time">{new Date(props.message.time).toLocaleTimeString()} </span>
                    </div>
                </div>
            }

            <div className="message-content">
                <span className="message">{props.message.message}</span>
            </div>
        </div>
    )
}

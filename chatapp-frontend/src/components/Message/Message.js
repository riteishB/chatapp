import React from 'react'
import {
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Divider,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import './Message.css'

export default function Message(props) {
    return (
        <div className="msgWell">
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    secondary={props.message.user}
                    primary={props.message.message}
                />
            </ListItem>
            <Divider />
        </div>
    )
}

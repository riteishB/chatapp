import React, { useState, useEffect } from 'react'
import { socket } from '../../App'
import { Drawer, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './OnlineUsers.css'

export default function OnlineUsers() {
    const [users, setUsers] = useState([])
    const [state, setState] = useState({
        right: false,
    })
    const anchor = 'right'

    const toggleDrawer = (anchor, open) => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setState({ ...state, [anchor]: open })
    }

    socket.on('usersList', users => {
        setUsers(users)
    })
    return (
        <div key={anchor}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(anchor, true)}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                <div className="drawerHeader">Online Users</div>
                <div className="onlineUsers">
                    {users.map(user => {
                        return (
                            <div key={user} className="onlineUser">
                                <span>
                                    <AccountCircleIcon />
                                </span>
                                <span>{user}</span>
                            </div>
                        )
                    })}
                </div>
            </Drawer>
        </div>
    )
}

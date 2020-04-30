import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function Chat(props) {
    const user = props.location.state ? props.location.state.user : undefined
    const room = props.location.state ? props.location.state.room : undefined
    if (user == null && room == null) {
        return <Redirect to="/" />
    } else {
        return (
            <div>
                <h2> Chat page</h2>
                {user} {room}
            </div>
        )
    }
}

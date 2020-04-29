import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function Chat(props) {
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')
    const [error, setError] = useState()

    useEffect(
        () => {
            if (props.location.state.user && props.location.state.room) {
                setUser(props.location.state.user)
                setRoom(props.location.state.room)
            } else {
                setError('Not signed in ')
            }
        },
        [room, user]
    )

    if (error) {
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

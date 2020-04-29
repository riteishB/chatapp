import React, { useEffect, useState } from 'react'

export default function Chat(props) {
    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')

    useEffect(
        () => {
            setUser(props.location.state.user)
            setRoom(props.location.state.room)
        },
        [room, user]
    )
    return (
        <div>
            <h2> Chat page</h2>
            {user} {room}
        </div>
    )
}

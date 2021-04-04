import { User } from "./interfaces/user"
import { connectedUsers } from "./userStore/users"

export const addUsers = (user: User) => {
    // check if the user with username already exists
    const existingUser = connectedUsers.find(
        (usr) => usr.name === user.name && usr.room === user.room
    )
    // if not add to the list
    if (existingUser) {
        throw Error('Username already exists')
    }
    connectedUsers.push(user)
}

export const removeUser = (id: string) => {
    const userIndex = connectedUsers.findIndex((usr) => usr.id === id)
    if (userIndex > -1) {
        connectedUsers.splice(userIndex, 1)
    }
}

export const getUser = (id: string) => {
    return connectedUsers.find((usr) => usr.id === id)
}

export const getConnectedUsersForRoom = (room: string) => {
    return connectedUsers
        .filter((usr) => {
            return usr.room === room
        })
        .map((usr) => usr.name)
}

export const getUsers = () => {
    return connectedUsers
}

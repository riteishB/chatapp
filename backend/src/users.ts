interface User {
    name: string
    id: string
    room: string
}
const users: User[] = []

export const addUsers = (user: User) => {
    // check if the user with username already exists
    const existingUser = users.find(
        (usr) => usr.name === user.name && usr.room === user.room
    )
    // if not add to the list
    if (existingUser) {
        return Error('Username already exists')
    }
    users.push(user)
    // else return an error
}

export const removeUser = (id: string) => {
    const userIndex = users.findIndex((usr) => usr.id === id)
    users.splice(userIndex, 1)
}

export const getUser = (id: string) => {
    return users.find((usr) => usr.id === id)
}

export const getConnectedUsers = (room: string) => {}

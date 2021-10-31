const rooms: string[] = []

export const addRoom = (room: string) => {
    // if not add to the list
    if (rooms.includes(room)) {
        return Error('Room already exists')
    }
    rooms.push(room)
}

export const getRooms = () => {
    return rooms
}

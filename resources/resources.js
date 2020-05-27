//fn para obtener la room de un socket

function getRoom(socket) {
    let rooms = Object.getOwnPropertyNames(socket.rooms)
    let room = rooms.filter(roomNumber => roomNumber != socket.id)
    return room[0]
}

module.exports = getRoom
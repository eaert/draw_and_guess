const gameRooms = {
    1: {drawer: false, guesser: false, drawing: null, startTime: null, endTime: null}
}

var roomNumber = 1

async function addUser() {
    if (gameRooms[roomNumber].drawer && gameRooms[roomNumber].guesser) {
        roomNumber+=1
        gameRooms[roomNumber] = {drawer: false, guesser: false, drawing: null, startTime: null, endTime: null}
        return addUser()
    } else if (gameRooms[roomNumber].drawer) {
        gameRooms[roomNumber].guesser = true
        return {gameRoom: roomNumber, rule: 'Guesser'}
    } else {
        gameRooms[roomNumber].drawer = true
        return {gameRoom: roomNumber, rule: 'Drawer'}
    }
}

async function checkRoomReady(roomNumber) {
    if (gameRooms[roomNumber].drawer && gameRooms[roomNumber].guesser) {
        return true
    } else {
        return false
    }
}

exports.addUser = addUser
exports.checkRoomReady = checkRoomReady
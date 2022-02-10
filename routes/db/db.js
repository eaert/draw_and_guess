const gameRooms = {
    1: {drawer: false, guesser: false, word: null, drawing: null, startTime: null, endTime: null}
}

var roomNumber = 1

async function addUser() {
    if (gameRooms[roomNumber].drawer && gameRooms[roomNumber].guesser) {
        roomNumber+=1
        gameRooms[roomNumber] = {drawer: false, guesser: false, word: null, drawing: null, startTime: null, endTime: null}
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

async function saveDrawing(roomNumber, drawing) {
    if (gameRooms[roomNumber]) {
        gameRooms[roomNumber].drawing = drawing
    }
}

async function getDrawing(roomNumber) {
    if (gameRooms[roomNumber]) {
        return gameRooms[roomNumber].drawing
    }
}

async function isDrawing(roomNumber) {
    if (gameRooms[roomNumber] && gameRooms[roomNumber].drawing) {
        return true
    }
    return false
}

async function checkGuess(roomNumber, word) {
    if (gameRooms[roomNumber]) {
        return gameRooms[roomNumber].word === word
    }
}

exports.addUser = addUser
exports.checkRoomReady = checkRoomReady
exports.saveDrawing = saveDrawing
exports.getDrawing = getDrawing
exports.isDrawing = isDrawing
exports.checkGuess = checkGuess
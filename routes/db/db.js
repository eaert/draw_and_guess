const gameRooms = {
    1: {drawer: false, guesser: false, word: null, drawing: null, startTime: null, endTime: null, points: 0}
}

const leaderScore = {
    time: {word: null, time: Infinity},
    score: {roomNumber: null, score: 0}
}

const scoreCalculate = {
    'easy': 1,
    'medium': 2,
    'hard': 3
}

var roomNumber = 1

function checkLeaderScore(roomNumber) {
    var newTime = gameRooms[roomNumber].endTime - gameRooms[roomNumber].startTime
    if (newTime < leaderScore.time.time) {
        leaderScore.time.word = Object.values(gameRooms[roomNumber].word)[0]
        leaderScore.time.time = newTime
    }
    var newScore = gameRooms[roomNumber].points
    if (newScore > leaderScore.score.score) {
        leaderScore.score.roomNumber = roomNumber
        leaderScore.score.score = newScore
    }
}

async function addUser() {
    if (gameRooms[roomNumber].drawer && gameRooms[roomNumber].guesser) {
        roomNumber+=1
        gameRooms[roomNumber] = {drawer: false, guesser: false, word: null, drawing: null, startTime: null, endTime: null, points: 0}
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

async function saveChoosenWord(roomNumber, word) {
    if (gameRooms[roomNumber]) {
        gameRooms[roomNumber].word = word
    }
}

async function saveDrawing(roomNumber, drawing) {
    if (gameRooms[roomNumber]) {
        gameRooms[roomNumber].drawing = drawing
        gameRooms[roomNumber].startTime = new Date()
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
        if (Object.values(gameRooms[roomNumber].word)[0] === word) {
            gameRooms[roomNumber].endTime = new Date()
            gameRooms[roomNumber].points += scoreCalculate[Object.keys(gameRooms[roomNumber].word)[0]] 
            checkLeaderScore(roomNumber)
            return true
        }
        return false
    }
}

exports.addUser = addUser
exports.checkRoomReady = checkRoomReady
exports.saveChoosenWord = saveChoosenWord
exports.saveDrawing = saveDrawing
exports.getDrawing = getDrawing
exports.isDrawing = isDrawing
exports.checkGuess = checkGuess
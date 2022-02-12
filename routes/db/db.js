const moment = require("moment")

const gameRooms = {
    1: {drawer: false, guesser: false, word: [], drawing: [], isDrawing: false, startTime: null, endTime: null, points: 0}
}

const leaderScore = {
    time: {word: null, time: null, timestamp: Infinity},
    score: {roomNumber: null, score: -Infinity, time: null}
}

const scoreCalculate = {
    'easy': 1,
    'medium': 3,
    'hard': 5
}

var roomNumber = 1

function lastValue(lst) {
    return lst[lst.length -1]
}

function checkLeaderScore(roomNumber) {
    var newTime = gameRooms[roomNumber].endTime - gameRooms[roomNumber].startTime
    if (newTime < leaderScore.time.timestamp) {
        leaderScore.time.word = Object.values(lastValue(gameRooms[roomNumber].word))[0]
        leaderScore.time.timestamp = newTime
        leaderScore.time.time = moment(newTime).format('mm:ss')
    }
    var newScore = gameRooms[roomNumber].points
    if (newScore > leaderScore.score.score) {
        leaderScore.score.roomNumber = roomNumber
        leaderScore.score.score = newScore
        leaderScore.score.time = moment().format('MMM Do YYYY, HH:MM:SS')
    }
}

async function addUser(currentRoom) {
    if ((gameRooms[roomNumber].drawer && gameRooms[roomNumber].guesser)) {
        roomNumber+=1
        if (!gameRooms[roomNumber]) {
            gameRooms[roomNumber] = {drawer: false, guesser: false, word: [], drawing: [], isDrawing: false, startTime: null, endTime: null, points: 0}
        }
        return await addUser()
    } else if (currentRoom == roomNumber) {
        roomNumber += 1
        if (!gameRooms[roomNumber]) {
            gameRooms[roomNumber] = {drawer: false, guesser: false, word: [], drawing: [], isDrawing: false, startTime: null, endTime: null, points: 0}
        }
        var newRoom = await addUser()
        roomNumber -= 1
        return newRoom
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
        gameRooms[roomNumber].word.push(word)
    }
}

async function saveDrawing(roomNumber, drawing) {
    if (gameRooms[roomNumber]) {
        gameRooms[roomNumber].drawing.push(drawing)
        gameRooms[roomNumber].startTime = moment()
        gameRooms[roomNumber].isDrawing = true
    }
}

async function getDrawing(roomNumber) {
    if (gameRooms[roomNumber]) {
        gameRooms[roomNumber].isDrawing = false
        return lastValue(gameRooms[roomNumber].drawing)
    }
}

async function isDrawing(roomNumber) {
    if (gameRooms[roomNumber] && gameRooms[roomNumber].isDrawing) {
        return true
    }
    return false
}

async function checkGuess(roomNumber, word) {
    if (gameRooms[roomNumber]) {
        if (Object.values(lastValue(gameRooms[roomNumber].word))[0] === word) {
            gameRooms[roomNumber].endTime = moment()
            gameRooms[roomNumber].points += scoreCalculate[Object.keys(lastValue(gameRooms[roomNumber].word))[0]] 
            checkLeaderScore(roomNumber)
            return true
        }
        return false
    }
}

async function getLeaderboard() {
    return leaderScore
}

exports.addUser = addUser
exports.checkRoomReady = checkRoomReady
exports.saveChoosenWord = saveChoosenWord
exports.saveDrawing = saveDrawing
exports.getDrawing = getDrawing
exports.isDrawing = isDrawing
exports.checkGuess = checkGuess
exports.getLeaderboard = getLeaderboard
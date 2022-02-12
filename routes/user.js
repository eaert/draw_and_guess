var express = require("express");
var router = express.Router();
var db = require('./db/db')

router.post('/join', async (req, res, next) => {
    try {
        var currentRoom
        if (req.session.player) {
            currentRoom = req.session.player.gameRoom
        } else {
            currentRoom = 0
        }
        req.session.player = await db.addUser(currentRoom)
        console.log(req.session.player)
        res.status(200).send('Join successfuly.')
    } catch (error) {
        next(error)
    }

})

router.get('/findOppnent', async (req, res, next) => {
    try {
        var isReady = await db.checkRoomReady(req.session.player.gameRoom)
        res.status(200).send({ready: isReady, rule: req.session.player.rule})
    } catch (error) {
        next(error)
    }

})
module.exports = router;
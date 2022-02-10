var express = require("express");
var router = express.Router();
var db = require('./db/db')
var randomWords = require('random-words');

router.get('/words', async (req, res, next) => {
    try {
        var words = randomWords({ exactly: 3 })
        var levels = {'easy': words[0], 'medium': words[1], 'hard': words[2]}
        res.status(200).send(levels)
    } catch (error) {
        next(error)
    }
})

router.post('/saveDrawing', async (req, res, next) => {
    try {
        var drawing = req.body
        db.saveDrawing(req.session.player.gameRoom, drawing)
        res.status(200).send('Drawing been saved successfuly.')
    } catch (error) {
        next(error)
    }
})

router.get('/loadDrawing', async (req, res, next) => {
    try {
        var drawing = await db.getDrawing(req.session.player.gameRoom)
        res.status(200).send(drawing)
    } catch (error) {
        next(error)
    }
})

router.get('/isDrawingReady', async (req, res, next) => {
    try {
        var isReady = await db.isDrawing(req.session.player.gameRoom)
        res.status(200).send(isReady)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
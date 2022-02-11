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

router.post('/choosenWord', async (req, res, next) => {
    try {
        await db.saveChoosenWord(req.session.player.gameRoom, req.body.word)
        res.status(200).send('Choosen Word been saved successfuly.')
    } catch (error) {
        next(error)
    }
})

router.post('/saveDrawing', async (req, res, next) => {
    try {
        var drawing = req.body
        await db.saveDrawing(req.session.player.gameRoom, drawing)
        req.session.player.rule = 'Guesser'
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

router.post('/guessWord', async (req, res, next) => {
    try {
        var isRight = await db.checkGuess(req.session.player.gameRoom, req.body.guess)
        if (isRight) {
            req.session.player.rule = 'Drawer'
        }
        res.status(200).send({isCurrect: isRight})
    } catch (error) {
        next(error)
    }
})

router.get('/leaderboard', async (req, res, next) => {
    try {

    } catch (error) {
        
    }
})

module.exports = router;
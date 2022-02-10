var express = require("express");
var router = express.Router();

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

router.post('/draw', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }

})

module.exports = router;
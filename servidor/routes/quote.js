var express = require('express')
const quoteModel = require('../models/quote');
const quoteModelMg = require('../models/quoteMg');

var router = express.Router()

router.get('/all', async (req, res, next) => {
    try {
        const quotes = await quoteModel.findAll({ 
            attributes: { exclude: ['tamano', 'isModelo', 'userId', 'fecha'] } 
        })
        res.json(quotes);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/report/:id', async (req, res, next) => {
    try {
        const quotes = await quoteModelMg.find({ idQuote: req.params.id }, function (err, docs) {});
        res.json(quotes);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router;
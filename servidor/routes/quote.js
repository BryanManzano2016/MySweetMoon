var express = require('express')
const quoteModel = require('../models/quote');
const quoteIngredient = require('../models/quote_ingredient');
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

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;

    quoteModel.findAll({
        where: {
            userId: id,
            isActive: true
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(404);
    });
});

router.get('/id/:id', async (req, res, next) => {
    let id = req.params.id;

    quoteModel.findAll({
        where: {
            id: id,
            isActive: true
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(404);
    });
});

router.post('/', async (req, res, next) => {
    let id = 0;
    await quoteModel.create({
        nombre: "",
        tamano: 10,
        isModelo: false,
        fecha: Date.now(),
        userId: 1,
        isActive: true
    }).then((result) => {
        id = result.dataValues.id;
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });

    await quoteIngredient.create({
        quoteId: id,
        ingredientId: req.body.tamaño
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });

    await quoteIngredient.create({
        quoteId: id,
        ingredientId: req.body.masa
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });

    await quoteIngredient.create({
        quoteId: id,
        ingredientId: req.body.relleno
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });

    await quoteIngredient.create({
        quoteId: id,
        ingredientId: req.body.cubierta
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });

    await quoteIngredient.create({
        quoteId: id,
        ingredientId: req.body.topping
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });

    res.sendStatus(200);
});

router.delete('/:id', async (req, res, next) =>{
    let id = req.params.id;

    quoteModel.update(
        {
            isActive: false
        },
        {
            where: {
                id: id
            }
        }
    ).then(function (rowsUpdated) {
        res.status = 200;
        res.send(rowsUpdated);
    })
        .catch(next => {
            console.log(next);
            res.sendStatus(404);
        });
});

router.put('/restore', async (req, res, next) =>{
    let id = req.params.id;

    quoteModel.update(
        {
            isActive: true
        },
        {
            where: {
                isActive: false
            }
        }
    ).then(function (rowsUpdated) {
        res.status = 200;
        res.send(rowsUpdated);
    })
        .catch(next => {
            console.log(next);
            res.sendStatus(404);
        });
});

router.put('/:id', async (req, res, next) =>{
    let id = req.params.id;

    quoteModel.update(
        {
            nombre: req.body.nombre
        },
        {
            where: {
                id: id
            }
        }
    ).then(function (rowsUpdated) {
        res.status = 200;
        res.send(rowsUpdated);
    })
        .catch(next => {
            console.log(next);
            res.sendStatus(404);
        });
});

module.exports = router;
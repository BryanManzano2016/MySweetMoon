var express = require('express');
var router = express.Router();
var Ingredientes = require('../models/ingredient');

router.get('/', async (req, res, next) => {
    Ingredientes.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.sendStatus(404);
        })
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;

    Ingredientes.findAll({
        where: {
            id: id
        }
    })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.sendStatus(404);
        })
});


router.post('/', async (req, res, next) => {
    res.sendStatus(404);
});


router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    let precio = req.body.precio;
    let nombre = req.body.nombre;
    console.log("\nSe modifica '" + id + "'")
    console.log("A nombre: " + nombre + " precio: " + precio);

    Ingredientes.update(
        {
            nombre: nombre,
            precio: precio
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


router.delete('/:id', async (req, res, next) => {
    res.sendStatus(404);
});


module.exports = router;
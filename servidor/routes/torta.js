var express = require('express');
var router = express.Router();
var Tortas = require('../models/torta');

router.post('/', async (req, res, next) => {
    let tamano = req.body.tamano;
    let masa = req.body.masa;
    let relleno = req.body.relleno;
    let cubierta = req.body.cubierta;
    let topping = req.body.topping;

    console.log("POST  ingredient nombre: " + nombre + " precio: " + precio + " tipo: " + tipo);
    Tortas.create({
        id: 0,
        tamano: tamano,
        masa: masa,
        relleno: relleno,
        cubierta: cubierta,
        topping: topping
    }).then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(404);
    });
});

module.exports = router;
